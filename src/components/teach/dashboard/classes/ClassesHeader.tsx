
import { useNavigate } from "react-router-dom";
import { Plus, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ClassesHeader = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="mb-4 sm:mb-8 rounded-none sm:rounded-md border-x-0 sm:border-x">
      <CardContent className="p-3 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="text-left">
            <h1 className="text-lg sm:text-2xl font-bold">Classes</h1>
            <p className="text-xs sm:text-base text-muted-foreground mt-1">
              Manage your classes and schedules
            </p>
          </div>
          
          <div className="flex gap-2 sm:gap-3">            
            <Button 
              variant="outline"
              size="sm"
              className="flex-1 sm:flex-none bg-white text-[#6E44FF] border-[#6E44FF] hover:bg-[#6E44FF]/10 text-xs sm:text-sm py-2 h-8 sm:h-10"
              onClick={() => navigate("/dashboard/classes")}
            >
              <BookOpen className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Manage Classes
            </Button>
            
            <Button 
              variant="default"
              size="sm"
              className="flex-1 sm:flex-none bg-[#6E44FF] hover:bg-[#6E44FF]/90 text-white text-xs sm:text-sm py-2 h-8 sm:h-10"
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

export default ClassesHeader;
