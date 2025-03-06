
import { CourseFormProvider } from "./CourseFormContext";
import CourseFormStepManager from "./CourseFormStepManager";
import { FormActions } from "./FormActions";
import { useCreateClassForm } from "./hooks/useCreateClassForm";
import FormStepContent from "./FormStepContent";

interface CreateClassFormProps {
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
  draftCount: number;
  userId: string | null;
}

const CreateClassForm = ({ 
  isSubmitting, 
  setIsSubmitting,
  draftCount,
  userId
}: CreateClassFormProps) => {
  const {
    form,
    currentStep,
    currentStepString,
    setCurrentStepString,
    totalSteps,
    goToNextStep,
    goToPreviousStep,
    sessions,
    setSessions,
    handleSubmitDraft,
    handleSubmitClass
  } = useCreateClassForm(isSubmitting, setIsSubmitting, draftCount, userId);

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
        <FormStepContent
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
        onPrevious={goToPreviousStep}
        onNext={goToNextStep}
        onSaveDraft={handleSubmitDraft}
        onSubmit={handleSubmitClass}
      />
    </CourseFormProvider>
  );
};

export default CreateClassForm;
