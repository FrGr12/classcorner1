
import { CourseFormProvider } from "./CourseFormContext";
import CourseFormStepManager from "./CourseFormStepManager";
import { FormActions } from "./FormActions";
import StepContent from "./StepContent";
import { useCreateClassForm } from "./hooks/useCreateClassForm";

interface CreateClassFormProps {
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
  draftCount: number;
}

const CreateClassForm = ({ 
  isSubmitting, 
  setIsSubmitting,
  draftCount 
}: CreateClassFormProps) => {
  const {
    form,
    currentStep,
    totalSteps,
    currentStepString,
    setCurrentStepString,
    goToNextStep,
    goToPreviousStep,
    sessions,
    setSessions,
    handleSubmitDraft,
    handleSubmitClass,
    nextStep,
    prevStep
  } = useCreateClassForm(isSubmitting, setIsSubmitting);

  return (
    <CourseFormProvider 
      form={form}
      isSubmitting={isSubmitting}
      setIsSubmitting={setIsSubmitting}
      currentStep={currentStepString}
      setCurrentStep={setCurrentStepString}
      goToNextStep={goToNextStep}
      goToPreviousStep={goToPreviousStep}
      sessions={sessions}
      setSessions={setSessions}
    >
      <CourseFormStepManager 
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
      >
        <StepContent 
          currentStep={currentStep}
          form={form}
          sessions={sessions}
          setSessions={setSessions}
        />
      </CourseFormStepManager>

      <FormActions 
        currentStep={currentStep}
        totalSteps={totalSteps}
        isSubmitting={isSubmitting}
        onPrevious={prevStep}
        onNext={nextStep}
        onSaveDraft={handleSubmitDraft}
        onSubmit={handleSubmitClass}
      />
    </CourseFormProvider>
  );
};

export default CreateClassForm;
