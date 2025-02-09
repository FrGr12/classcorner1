
import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, BellRing, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import NotificationCenter from "@/components/notifications/NotificationCenter";

const NotificationsCard: FC = () => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <BellRing className="h-5 w-5 text-purple-600" />
            Recent Activity
          </CardTitle>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate("/dashboard/notifications")}
        >
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <NotificationCenter limit={5} />
      </CardContent>
    </Card>
  );
};

export default NotificationsCard;
