
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { mockClasses } from "@/data/mockClasses";
import ClassesHeader from "./classes/ClassesHeader";
import ClassesTabs from "./classes/ClassesTabs";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const TeacherClasses = () => {
  const navigate = useNavigate();
  const allClasses = Object.values(mockClasses).flat();

  const handleAction = (action: string, classId: number) => {
    try {
      switch (action) {
        case "edit":
          navigate(`/dashboard/classes/${classId}/edit`);
          break;
        case "message":
          toast("Opening message composer...");
          break;
        case "boost":
          if (!classId) {
            throw new Error("Class ID is required to boost a class");
          }
          toast("Boost feature coming soon!");
          break;
        case "cancel":
          if (!classId) {
            throw new Error("Class ID is required to cancel a class");
          }
          toast("Class cancelled successfully", {
            description: "All registered students will be notified automatically."
          });
          break;
        default:
          throw new Error(`Unknown action: ${action}`);
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred while performing this action");
    }
  };

  if (!allClasses.length) {
    return (
      <div className="space-y-6">
        <ClassesHeader />
        <Alert variant="warning">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>No Classes Found</AlertTitle>
          <AlertDescription>
            You haven't created any classes yet. Click the "Create Class" button above to get started.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ClassesHeader />
      <ClassesTabs classes={allClasses} onAction={handleAction} />
    </div>
  );
};

export default TeacherClasses;
