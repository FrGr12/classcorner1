
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";

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
        <form className="space-y-8">
          {/* Form implementation will be added later */}
          <p className="text-muted-foreground">Form coming soon...</p>
        </form>
      </Card>
    </div>
  );
};

export default EditClass;
