
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CreateClassHeaderProps {
  draftCount: number;
  isSubmitting: boolean;
}

const CreateClassHeader = ({ draftCount, isSubmitting }: CreateClassHeaderProps) => {
  const navigate = useNavigate();

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:text-accent-purple"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">Create New Class</h1>
            <p className="text-muted-foreground mt-1">
              Share your expertise with the world
            </p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="outline"
            className="bg-white text-accent-purple border-accent-purple hover:bg-accent-purple/10"
            onClick={() => navigate("/dashboard/classes?tab=drafts")}
            disabled={isSubmitting}
          >
            See draft classes ({draftCount})
          </Button>
          
          <Button 
            type="submit"
            form="create-class-form"
            className="bg-accent-purple hover:bg-accent-purple/90 text-white"
            disabled={isSubmitting}
          >
            <Plus className="mr-2 h-4 w-4" />
            Publish Class
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CreateClassHeader;
