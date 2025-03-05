
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const ClassesHeader = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="mb-4 sm:mb-8 rounded-none sm:rounded-md border-x-0 sm:border-x">
      <CardContent className="p-3 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          <div className="text-left">
            <h1 className="text-xl sm:text-2xl font-bold">Your Classes</h1>
            <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
              Manage and create your classes
            </p>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <Button 
              variant="outline" 
              className="text-xs sm:text-sm h-8 sm:h-10"
              onClick={() => navigate("/dashboard/classes/create")}
            >
              Create Class
            </Button>
            <Button 
              className="bg-accent-purple hover:bg-accent-purple/90 text-white text-xs sm:text-sm h-8 sm:h-10"
              onClick={() => navigate("/dashboard/classes/create")}
            >
              New Class
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassesHeader;
