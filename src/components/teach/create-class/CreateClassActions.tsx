
import { Button } from "@/components/ui/button";

interface CreateClassActionsProps {
  isSubmitting: boolean;
  onSaveDraft: () => void;
}

const CreateClassActions = ({ isSubmitting, onSaveDraft }: CreateClassActionsProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-center items-center gap-3 sm:gap-4 pt-4 pb-12">
      <Button 
        type="button"
        variant="outline"
        className="w-full sm:w-auto bg-white text-accent-purple border-accent-purple hover:bg-accent-purple/10 px-4 sm:px-8 text-sm"
        onClick={onSaveDraft}
        disabled={isSubmitting}
      >
        Save and publish later
      </Button>
      
      <Button 
        type="submit"
        className="w-full sm:w-auto bg-accent-purple hover:bg-accent-purple/90 text-white px-4 sm:px-8 text-sm"
        disabled={isSubmitting}
      >
        Save and publish
      </Button>
    </div>
  );
};

export default CreateClassActions;
