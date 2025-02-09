
import { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Notification } from "@/types/notification";
import NotificationItem from "./NotificationItem";

interface NotificationTabsProps {
  notifications: Notification[];
  activeTab: string;
  onTabChange: (value: string) => void;
  onMarkAsRead?: (id: string) => Promise<void>;
}

const NotificationTabs: FC<NotificationTabsProps> = ({
  notifications,
  activeTab,
  onTabChange,
  onMarkAsRead
}) => {
  const filteredNotifications = notifications.filter(
    n => activeTab === "all" || n.category === activeTab
  );

  return (
    <Tabs defaultValue="all" className="w-full" onValueChange={onTabChange}>
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
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={onMarkAsRead}
              />
            ))
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default NotificationTabs;
