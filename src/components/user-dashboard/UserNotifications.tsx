import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UserNotifications = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Notifications</h1>
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No notifications to display.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserNotifications;