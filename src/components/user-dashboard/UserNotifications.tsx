import { Card } from "@/components/ui/card";
import { Bell } from "lucide-react";

const UserNotifications = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <Bell className="w-5 h-5 text-neutral-400" />
      </div>
      <div className="space-y-4">
        <p className="text-sm text-neutral-600">No notifications yet</p>
      </div>
    </Card>
  );
};

export default UserNotifications;