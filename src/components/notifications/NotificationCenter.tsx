import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Calendar,
  MessageSquare,
  Clock,
  Tag,
  Bell,
  CheckCircle2
} from "lucide-react";

interface DatabaseNotification {
  id: number;
  user_id: string;
  notification_type: string;
  content: string;
  status: string;
  booking_id?: number;
  error?: string;
  sent_at: string;
  category?: string;
  read_at?: string | null;
  reference_id?: string | null;
}

interface Notification {
  id: string;
  user_id: string;
  notification_type: string;
  content: string;
  status: string;
  category: string;
  created_at: string;
  read_at: string | null;
  reference_id: string | null;
  booking_id?: number;
  error?: string;
}

interface NotificationCenterProps {
  limit?: number;
}

const NotificationCenter = ({ limit }: NotificationCenterProps = {}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetchNotifications();
    subscribeToNotifications();
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'bookings':
        return <Calendar className="h-4 w-4" />;
      case 'messages':
        return <MessageSquare className="h-4 w-4" />;
      case 'waitlist':
        return <Clock className="h-4 w-4" />;
      case 'offers':
        return <Tag className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const filteredNotifications = notifications.filter(
    n => activeTab === "all" || n.category === activeTab
  );

  if (limit) {
    return (
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            No notifications
          </div>
        ) : (
          notifications.slice(0, limit).map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start justify-between p-4 rounded-lg border ${
                !notification.read_at ? 'bg-muted/50' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 text-muted-foreground">
                  {getCategoryIcon(notification.category)}
                </div>
                <div>
                  <p className="text-sm">{notification.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(notification.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Notifications</CardTitle>
          <Badge variant="secondary">
            {notifications.filter(n => !n.read_at).length} New
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="waitlist">Waitlist</TabsTrigger>
            <TabsTrigger value="offers">Offers</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <div className="space-y-4">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  No notifications
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start justify-between p-4 rounded-lg border ${
                      !notification.read_at ? 'bg-muted/50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1 text-muted-foreground">
                        {getCategoryIcon(notification.category)}
                      </div>
                      <div>
                        <p className="text-sm">{notification.content}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(notification.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {!notification.read_at && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NotificationCenter;
