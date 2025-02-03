import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import CourseForm from "./CourseForm";

const EditClass = () => {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Class</h1>
        <p className="text-muted-foreground">
          Update your class details and schedule
        </p>
      </div>

      <Card className="p-6">
        <CourseForm courseId={id} mode="edit" />
      </Card>
    </div>
  );
};

export default EditClass;