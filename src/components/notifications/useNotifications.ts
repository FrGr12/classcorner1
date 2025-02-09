
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { DatabaseNotification, Notification } from "./types";

export const useNotifications = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState("all");

  const fetchNotifications = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('notification_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('sent_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      
      const formattedNotifications: Notification[] = (data as DatabaseNotification[]).map(notification => ({
        id: notification.id.toString(),
        user_id: notification.user_id,
        notification_type: notification.notification_type,
        content: notification.content,
        status: notification.status,
        category: notification.category || 'general',
        created_at: notification.sent_at,
        read_at: notification.read_at || null,
        reference_id: notification.reference_id || null,
        booking_id: notification.booking_id,
        error: notification.error
      }));
      
      setNotifications(formattedNotifications);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load notifications"
      });
    }
  };

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
          const newNotification: Notification = {
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
          };
          setNotifications(prev => [newNotification, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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

  useEffect(() => {
    fetchNotifications();
    subscribeToNotifications();
  }, []);

  return {
    notifications,
    activeTab,
    setActiveTab,
    markAsRead
  };
};
