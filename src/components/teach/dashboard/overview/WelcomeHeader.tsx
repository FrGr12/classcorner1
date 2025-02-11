
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
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">{greeting}!</h1>
            <p className="text-muted-foreground mt-1">
              Welcome to your teaching dashboard. Here's what you can do:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              variant="default"
              size="lg"
              className="w-full bg-accent-purple hover:bg-accent-purple/90 text-white"
              onClick={() => navigate("/dashboard/create-class")}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create New Class
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeHeader;
