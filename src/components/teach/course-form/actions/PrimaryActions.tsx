
import { Button } from "@/components/ui/button";

interface PrimaryActionsProps {
  currentStep: number;
  totalSteps: number;
  isSubmitting: boolean;
  onNext: () => void;
  onSubmit: () => void;
}

export const PrimaryActions = ({
  currentStep,
  totalSteps,
  isSubmitting,
  onNext,
  onSubmit,
}: PrimaryActionsProps) => {
  const isFinalStep = currentStep === totalSteps - 1;

  return (
    <>
      {isFinalStep ? (
        <Button 
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          size="lg"
          variant="default"
          isLoading={isSubmitting}
          loadingText="Creating Class..."
          aria-label="Submit and create class"
        >
          Create Class
        </Button>
      ) : (
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
      )}
    </>
  );
};
