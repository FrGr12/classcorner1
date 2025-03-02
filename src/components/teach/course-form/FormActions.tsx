
import { PrimaryActions } from "./actions/PrimaryActions";
import { SecondaryActions } from "./actions/SecondaryActions";

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
      <SecondaryActions
        currentStep={currentStep}
        isSubmitting={isSubmitting}
        onPrevious={onPrevious}
        onSaveDraft={onSaveDraft}
      />
      
      <PrimaryActions
        currentStep={currentStep}
        totalSteps={totalSteps}
        isSubmitting={isSubmitting}
        onNext={onNext}
        onSubmit={onSubmit}
      />
    </div>
  );
};
