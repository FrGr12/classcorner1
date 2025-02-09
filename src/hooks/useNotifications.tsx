
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { DatabaseNotification, Notification } from "@/types/notification";

export const useNotifications = (limit?: number) => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    fetchNotifications();
    const unsubscribe = subscribeToNotifications();
    return () => {
      unsubscribe();
    };
  }, []);

  const subscribeToNotifications = () => {
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notification_logs'
        },
        (payload) => {
          const dbNotification = payload.new as DatabaseNotification;
          const newNotification = formatNotification(dbNotification);
          setNotifications(prev => [newNotification, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const formatNotification = (dbNotification: DatabaseNotification): Notification => ({
    id: dbNotification.id.toString(),
    user_id: dbNotification.user_id,
    notification_type: dbNotification.notification_type,
    content: dbNotification.content,
    status: dbNotification.status,
    category: dbNotification.category || 'general',
    created_at: dbNotification.sent_at,
    read_at: dbNotification.read_at || null,
    reference_id: dbNotification.reference_id || null,
    booking_id: dbNotification.booking_id,
    error: dbNotification.error
  });

  const fetchNotifications = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      let query = supabase
        .from('notification_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('sent_at', { ascending: false });

      if (limit) {
        query = query.limit(limit);
      } else {
        query = query.limit(50);
      }

      const { data, error } = await query;
      if (error) throw error;
      
      const formattedNotifications = (data as DatabaseNotification[])
        .map(formatNotification);
      
      setNotifications(formattedNotifications);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load notifications"
      });
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notification_logs')
        .update({
          read_at: new Date().toISOString(),
          status: 'read'
        })
        .eq('id', parseInt(notificationId));

      if (error) throw error;

      setNotifications(prev =>
        prev.map(n =>
          n.id === notificationId
            ? { ...n, read_at: new Date().toISOString(), status: 'read' }
            : n
        )
      );
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to mark notification as read"
      });
    }
  };

  return { notifications, markAsRead };
};
