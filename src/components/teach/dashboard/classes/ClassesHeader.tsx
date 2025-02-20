import { useNavigate } from "react-router-dom";
import { Plus, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
const ClassesHeader = () => {
  const navigate = useNavigate();
  return <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <h1 className="text-2xl font-bold">Classes</h1>
            <p className="text-muted-foreground mt-1">
              Manage your classes and schedules
            </p>
          </div>
          
          <div className="flex gap-3">
            
            
            <Button variant="default" size="sm" className="bg-accent-purple hover:bg-accent-purple/90 text-white" onClick={() => navigate("/dashboard/create-class")}>
              <Plus className="mr-2 h-4 w-4" />
              Create New Class
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>;
};
export default ClassesHeader;