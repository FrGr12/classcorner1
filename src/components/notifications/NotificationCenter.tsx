
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNotifications } from "@/hooks/useNotifications";
import NotificationItem from "./NotificationItem";
import NotificationTabs from "./NotificationTabs";

interface NotificationCenterProps {
  limit?: number;
}

const NotificationCenter = ({ limit }: NotificationCenterProps = {}) => {
  const [activeTab, setActiveTab] = useState("all");
  const { notifications, markAsRead } = useNotifications(limit);

  if (limit) {
    return (
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            No notifications
          </div>
        ) : (
          notifications.slice(0, limit).map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              showActions={false}
            />
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
        <NotificationTabs
          notifications={notifications}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onMarkAsRead={markAsRead}
        />
      </CardContent>
    </Card>
  );
};

export default NotificationCenter;
