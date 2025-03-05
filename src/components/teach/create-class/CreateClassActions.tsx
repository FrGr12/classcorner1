
import { Button } from "@/components/ui/button";

interface CreateClassActionsProps {
  isSubmitting: boolean;
  onSaveDraft: () => void;
}

const CreateClassActions = ({ isSubmitting, onSaveDraft }: CreateClassActionsProps) => {
  return (
    <div className="flex justify-center gap-4 pt-4 pb-12">
      <Button 
        type="button"
        variant="outline"
        className="bg-white text-accent-purple border-accent-purple hover:bg-accent-purple/10 px-8"
        onClick={onSaveDraft}
        disabled={isSubmitting}
      >
        Save and publish later
      </Button>
      
      <Button 
        type="submit"
        className="bg-accent-purple hover:bg-accent-purple/90 text-white px-8"
        disabled={isSubmitting}
      >
        Save and publish
      </Button>
    </div>
  );
};

export default CreateClassActions;
