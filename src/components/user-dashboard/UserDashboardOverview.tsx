import { Card } from "@/components/ui/card";
import { MessageSquare, Calendar, Bell } from "lucide-react";

const UserDashboardOverview = () => {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold mb-6">Welcome back!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-neutral-600">Unread Messages</p>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-neutral-600">Upcoming Classes</p>
              <p className="text-2xl font-bold">2</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Bell className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-neutral-600">New Notifications</p>
              <p className="text-2xl font-bold">5</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboardOverview;