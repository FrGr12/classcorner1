
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface CreateClassActionsProps {
  isSubmitting: boolean;
  onSaveDraft: () => void;
  isValid: boolean;
}

const CreateClassActions = ({ isSubmitting, onSaveDraft, isValid }: CreateClassActionsProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 pb-12">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
            type="button"
            variant="outline"
            className="bg-white text-accent-purple border-accent-purple hover:bg-accent-purple/10 px-8 w-full sm:w-auto"
            disabled={isSubmitting}
          >
            Save and publish later
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Save as Draft</AlertDialogTitle>
            <AlertDialogDescription>
              Your class will be saved as a draft. You can continue editing it later from your dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onSaveDraft}>Save Draft</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
            type="submit"
            className="bg-accent-purple hover:bg-accent-purple/90 text-white px-8 w-full sm:w-auto"
            disabled={isSubmitting || !isValid}
          >
            Save and publish
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Publish Class</AlertDialogTitle>
            <AlertDialogDescription>
              Your class will be published and visible to students. You can still make changes after publishing.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction form="create-class-form" type="submit">Publish</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CreateClassActions;
