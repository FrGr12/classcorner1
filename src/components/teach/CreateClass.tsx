import { useNavigate } from "react-router-dom";
import CourseForm from "./CourseForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const CreateClass = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Create New Class</h2>
          <p className="text-sm text-muted-foreground">
            Fill in the details below to create your new class listing.
          </p>
        </div>
        <Button
          variant="ghost"
          onClick={() => navigate("/teach/classes")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Classes
        </Button>
      </div>

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <CourseForm />
      </div>
    </div>
  );
};

export default CreateClass;