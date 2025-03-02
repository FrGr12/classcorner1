
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormWrapper } from "./FormWrapper";
import { Button } from "@/components/ui/button";
import { ProgressIndicator } from "@/components/ui/progress-indicator";
import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { FormActions } from "./FormActions";
import { CourseFormStepManager } from "./CourseFormStepManager";
import { CourseFormProvider, CourseFormValues } from "./CourseFormContext";
import { formSteps, defaultFormValues } from "./utils/formDefaults";
import { useCourseFormData } from "./hooks/useCourseFormData";
import { saveDraftCourse, submitCourse } from "./utils/courseFormUtils";
import { Session } from "@/types/session";

interface CreateClassFormProps {
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
  draftCount: number;
}

const CreateClassForm = ({
  isSubmitting,
  setIsSubmitting,
  draftCount,
}: CreateClassFormProps) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [sessions, setSessions] = useState<Session[]>([]);
  
  const form = useForm<CourseFormValues>({
    defaultValues: defaultFormValues
  });

  const { isLoading, error } = useCourseFormData(form);

  const handleNext = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSaveDraft = () => {
    saveDraftCourse(form, sessions, setIsSubmitting);
  };

  const handleSubmit = () => {
    submitCourse(form, sessions, setIsSubmitting, navigate);
  };

  return (
    <CourseFormProvider 
      form={form} 
      isSubmitting={isSubmitting}
      setIsSubmitting={setIsSubmitting}
      currentStep={formSteps[currentStep]}
      setCurrentStep={(step) => {
        const stepIndex = formSteps.indexOf(step);
        if (stepIndex >= 0) {
          setCurrentStep(stepIndex);
        }
      }}
      goToNextStep={handleNext}
      goToPreviousStep={handlePrevious}
      sessions={sessions}
      setSessions={setSessions}
    >
      <FormWrapper>
        <Card className="p-6 mb-8">
          <ProgressIndicator 
            steps={formSteps} 
            currentStep={currentStep} 
            className="mb-8" 
            aria-label="Course creation progress"
          />
          
          <CourseFormStepManager 
            currentStep={currentStep} 
          />
          
          <FormActions 
            currentStep={currentStep}
            totalSteps={formSteps.length}
            isSubmitting={isSubmitting}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSaveDraft={handleSaveDraft}
            onSubmit={handleSubmit}
          />
        </Card>
      </FormWrapper>
    </CourseFormProvider>
  );
};

export default CreateClassForm;
