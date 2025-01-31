import { Card } from "@/components/ui/card";
import NotificationPreferences from "@/components/notifications/NotificationPreferences";

const UserDashboardOverview = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <NotificationPreferences />
        <Card>
          <h2 className="text-lg font-semibold">Overview</h2>
          <p className="text-sm text-muted-foreground">
            Here you can find a summary of your activities and notifications.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboardOverview;
