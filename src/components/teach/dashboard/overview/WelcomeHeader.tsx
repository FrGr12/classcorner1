
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
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-left">
            <h1 className="text-lg sm:text-2xl font-bold">{greeting}!</h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Welcome to your teaching dashboard
            </p>
          </div>
          
          <div className="flex gap-2 sm:gap-3">
            <Button 
              variant="outline"
              size="sm"
              className="flex-1 sm:flex-none bg-white text-accent-purple border-accent-purple hover:bg-accent-purple/10 text-xs sm:text-sm"
              onClick={() => navigate("/dashboard/classes")}
            >
              <BookOpen className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Manage Classes
            </Button>
            
            <Button 
              variant="default"
              size="sm"
              className="flex-1 sm:flex-none bg-accent-purple hover:bg-accent-purple/90 text-white text-xs sm:text-sm"
              onClick={() => navigate("/dashboard/create-class")}
            >
              <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Create Class
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeHeader;
