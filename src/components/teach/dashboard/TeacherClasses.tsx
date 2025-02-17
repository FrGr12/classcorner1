
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { mockClasses } from "@/data/mockClasses";
import ClassesHeader from "./classes/ClassesHeader";
import ClassesTabs from "./classes/ClassesTabs";

const TeacherClasses = () => {
  const navigate = useNavigate();
  const allClasses = Object.values(mockClasses).flat();

  const handleAction = (action: string, classId: number) => {
    switch (action) {
      case "edit":
        navigate(`/dashboard/classes/${classId}/edit`);
        break;
      case "message":
        toast.success("Opening message composer...");
        break;
      case "boost":
        toast.success("Boost feature coming soon!");
        break;
      case "cancel":
        toast.success("Class cancelled successfully");
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6">
      <ClassesHeader />
      <ClassesTabs classes={allClasses} onAction={handleAction} />
    </div>
  );
};

export default TeacherClasses;
