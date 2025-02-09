
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, Clock, Tag, Bell, CheckCircle2 } from "lucide-react";
import type { Notification } from "./types";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

export const NotificationItem = ({ notification, onMarkAsRead }: NotificationItemProps) => {
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

  return (
    <div
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
          onClick={() => onMarkAsRead(notification.id)}
        >
          <CheckCircle2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
