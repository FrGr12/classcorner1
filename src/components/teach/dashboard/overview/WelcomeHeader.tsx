
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Plus, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const WelcomeHeader: FC = () => {
  const navigate = useNavigate();
  const currentHour = new Date().getHours();
  let greeting = "Good morning";
  
  if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good afternoon";
  } else if (currentHour >= 17) {
    greeting = "Good evening";
  }

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <h1 className="text-2xl font-bold">{greeting}!</h1>
            <p className="text-muted-foreground mt-1">
              Welcome to your teaching dashboard. Here's what you can do:
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline"
              size="sm"
              className="bg-white text-accent-purple border-accent-purple hover:bg-accent-purple/10"
              onClick={() => navigate("/dashboard/classes")}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Manage Classes
            </Button>
            
            <Button 
              variant="default"
              size="sm"
              className="bg-accent-purple hover:bg-accent-purple/90 text-white"
              onClick={() => navigate("/dashboard/create-class")}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create New Class
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeHeader;
