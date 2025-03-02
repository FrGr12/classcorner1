
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  currentStep: number;
  totalSteps: number;
  isSubmitting: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSaveDraft: () => void;
  onSubmit: () => void;
}

export const FormActions = ({
  currentStep,
  totalSteps,
  isSubmitting,
  onPrevious,
  onNext,
  onSaveDraft,
  onSubmit,
}: FormActionsProps) => {
  return (
    <div className="flex justify-between mt-8">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onPrevious}
        disabled={currentStep === 0 || isSubmitting}
        size="lg"
        aria-label="Previous step"
      >
        Previous
      </Button>
      
      <div className="space-x-3">
        <Button 
          type="button" 
          variant="secondary" 
          onClick={onSaveDraft}
          disabled={isSubmitting}
          isLoading={isSubmitting && currentStep !== totalSteps - 1}
          loadingText="Saving..."
          size="lg"
          aria-label="Save draft"
        >
          Save Draft
        </Button>
        
        {currentStep < totalSteps - 1 ? (
          <Button 
            type="button" 
            variant="default"
            onClick={onNext}
            disabled={isSubmitting}
            size="lg"
            aria-label="Next step"
          >
            Next
          </Button>
        ) : (
          <Button 
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            size="lg"
            variant="default"
            isLoading={isSubmitting && currentStep === totalSteps - 1}
            loadingText="Creating Class..."
            aria-label="Submit and create class"
          >
            Create Class
          </Button>
        )}
      </div>
    </div>
  );
};
