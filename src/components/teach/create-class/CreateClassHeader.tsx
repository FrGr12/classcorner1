
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
    <Card className="p-3 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:text-accent-purple flex-shrink-0"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold">Create New Class</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Share your expertise with the world
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button 
            variant="outline"
            className="text-xs sm:text-sm bg-white text-accent-purple border-accent-purple hover:bg-accent-purple/10 px-3 py-1.5 h-auto"
            onClick={() => navigate("/dashboard/classes?tab=drafts")}
            disabled={isSubmitting}
          >
            See draft classes ({draftCount})
          </Button>
          
          <Button 
            type="submit"
            form="create-class-form"
            className="text-xs sm:text-sm bg-accent-purple hover:bg-accent-purple/90 text-white px-3 py-1.5 h-auto"
            disabled={isSubmitting}
          >
            <Plus className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
            Publish Class
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CreateClassHeader;
