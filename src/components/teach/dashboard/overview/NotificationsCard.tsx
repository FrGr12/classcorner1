
import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NotificationCenter from "@/components/notifications/NotificationCenter";

const NotificationsCard: FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <NotificationCenter />
      </CardContent>
    </Card>
  );
};

export default NotificationsCard;
