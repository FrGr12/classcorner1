
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";

interface SecondaryActionsProps {
  currentStep: number;
  isSubmitting: boolean;
  onPrevious: () => void;
  onSaveDraft: () => void;
}

export const SecondaryActions = ({
  currentStep,
  isSubmitting,
  onPrevious,
  onSaveDraft,
}: SecondaryActionsProps) => {
  return (
    <div className="flex items-center gap-3">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onPrevious}
        disabled={currentStep === 0 || isSubmitting}
        size="lg"
        aria-label="Previous step"
        className="flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Previous
      </Button>
      
      <Button 
        type="button" 
        variant="secondary" 
        onClick={onSaveDraft}
        disabled={isSubmitting}
        isLoading={isSubmitting}
        loadingText="Saving..."
        size="lg"
        aria-label="Save draft"
        className="flex items-center gap-2"
      >
        <Save className="h-4 w-4" />
        Save Draft
      </Button>
    </div>
  );
};
