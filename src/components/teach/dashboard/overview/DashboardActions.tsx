
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen, Users, ChartBar } from "lucide-react";

const DashboardActions: FC = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardContent className="grid grid-cols-2 gap-4 p-6">
        <Button 
          variant="default"
          size="lg"
          className="w-full bg-accent-purple hover:bg-accent-purple/90 text-white"
          onClick={() => navigate("/dashboard/create-class")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Class
        </Button>
        
        <Button 
          variant="default"
          size="lg"
          className="w-full bg-accent-purple hover:bg-accent-purple/90 text-white"
          onClick={() => navigate("/dashboard/classes")}
        >
          <BookOpen className="mr-2 h-4 w-4" />
          Manage Classes
        </Button>
        
        <Button 
          variant="default"
          size="lg"
          className="w-full bg-accent-purple hover:bg-accent-purple/90 text-white"
          onClick={() => navigate("/dashboard/bookings")}
        >
          <Users className="mr-2 h-4 w-4" />
          View Bookings
        </Button>
        
        <Button 
          variant="default"
          size="lg"
          className="w-full bg-accent-purple hover:bg-accent-purple/90 text-white"
          onClick={() => navigate("/dashboard/analytics")}
        >
          <ChartBar className="mr-2 h-4 w-4" />
          Analytics
        </Button>
      </CardContent>
    </Card>
  );
};

export default DashboardActions;
