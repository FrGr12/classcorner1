
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: number;
  title: string;
  message: string;
  created_at: string;
  read: boolean;
}

const UserNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('notification_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('sent_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const formattedNotifications = data.map(notification => ({
          id: notification.id,
          title: notification.notification_type,
          message: notification.content || 'No message content',
          created_at: notification.sent_at,
          read: notification.status === 'delivered'
        }));
        setNotifications(formattedNotifications);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error fetching notifications",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const goToSettings = () => {
    navigate("/dashboard/preferences");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <Button variant="outline" size="sm" onClick={goToSettings}>
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>
      
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Notifications</h2>
          <Bell className="w-5 h-5 text-neutral-400" />
        </div>
        <div className="space-y-4">
          {loading ? (
            <p className="text-sm text-neutral-600">Loading notifications...</p>
          ) : notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border ${
                  notification.read ? 'bg-white' : 'bg-blue-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{notification.title}</h3>
                    <p className="text-sm text-neutral-600 mt-1">
                      {notification.message}
                    </p>
                  </div>
                  <span className="text-xs text-neutral-500">
                    {new Date(notification.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-neutral-600">No notifications yet</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default UserNotifications;
