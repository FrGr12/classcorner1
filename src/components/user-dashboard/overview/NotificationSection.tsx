
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NotificationCenter from "@/components/notifications/NotificationCenter";

const NotificationSection = () => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Notifications</CardTitle>
        <Button 
          variant="ghost" 
          className="text-accent-purple"
          onClick={() => navigate("/student-dashboard/notifications")}
        >
          View All
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <NotificationCenter limit={5} />
      </CardContent>
    </Card>
  );
};

export default NotificationSection;
