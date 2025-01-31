import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const TeacherClasses = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">My Classes</h2>
          <p className="text-sm text-muted-foreground">
            Manage your class listings and schedules.
          </p>
        </div>
        <Button onClick={() => navigate("/teach/new")} className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Class
        </Button>
      </div>

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No Classes Yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              You haven't created any classes yet. Start by adding your first class.
            </p>
            <Button onClick={() => navigate("/teach/new")} className="gap-2">
              <Plus className="h-4 w-4" />
              Create Your First Class
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherClasses;