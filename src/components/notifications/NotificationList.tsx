
import { NotificationItem } from "./NotificationItem";
import type { Notification } from "./types";
import LoadingState from "../user-dashboard/LoadingState";

interface NotificationListProps {
  notifications: Notification[];
  activeTab: string;
  onMarkAsRead: (id: string) => void;
  isLoading?: boolean;
}

export const NotificationList = ({ 
  notifications, 
  activeTab, 
  onMarkAsRead, 
  isLoading 
}: NotificationListProps) => {
  if (isLoading) {
    return <LoadingState />;
  }

  const filteredNotifications = notifications.filter(
    n => activeTab === "all" || n.category === activeTab
  );

  if (filteredNotifications.length === 0) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        No notifications
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredNotifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
        />
      ))}
    </div>
  );
};
