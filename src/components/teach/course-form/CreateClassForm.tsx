
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateClassSchema, CreateClassFormValues } from "@/lib/validators/create-class";
import { CourseFormProvider } from "./CourseFormContext";
import CourseFormStepManager from "./CourseFormStepManager";
import GeneralInformation from "./sections/GeneralInformation";
import ClassDetails from "./sections/ClassDetails";
import SessionsWrapper from "./sections/SessionsWrapper";
import PricingAndLogistics from "./sections/PricingAndLogistics";
import Media from "./sections/Media";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { FormActions } from "./FormActions";
import { Session } from "@/types/session";
import { handleError } from "@/utils/errorHandler";

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
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [sessions, setSessions] = useState<Session[]>([]);

  const form = useForm<CreateClassFormValues>({
    resolver: zodResolver(CreateClassSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      location: '',
      address: '',
      city: '',
      is_online: false,
      capacity: 1,
      price: 0,
      duration: "60", // Ensure string type to match DB schema
      sessions: [],
      learning_outcomes: [''],
      requirements: [''],
      items_to_bring: [''],
      images: [],
      status: 'draft',
      min_participants: undefined,
      max_participants: undefined,
      waitlist_enabled: false,
      max_waitlist_size: undefined,
    },
    mode: "onChange",
  });

  // Form step navigation
  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const totalSteps = 5;
  
  // String values for step navigation
  const currentStepString = String(currentStep);
  const setCurrentStepString = (step: string) => setCurrentStep(Number(step));
  
  // Navigation functions
  const goToNextStep = () => nextStep();
  const goToPreviousStep = () => prevStep();

  const handleSubmitDraft = async () => {
    try {
      const formValues = form.getValues();
      setIsSubmitting(true);
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;
  
      // Prepare course data ensuring all types match the database schema
      const courseData = {
        instructor_id: userData.user.id,
        title: formValues.title || 'Untitled Course',
        description: formValues.description || 'No description',
        category: formValues.category || 'Uncategorized',
        location: formValues.location || 'Unknown',
        price: formValues.price || 0,
        duration: formValues.duration, // Already a string
        capacity: formValues.capacity,
        is_online: formValues.is_online,
        address: formValues.address,
        city: formValues.city,
        learning_outcomes: formValues.learning_outcomes,
        requirements: formValues.requirements,
        items_to_bring: formValues.items_to_bring,
        status: "draft" as const,
        images: formValues.images,
        sessions: formValues.sessions,
        min_participants: formValues.min_participants,
        max_participants: formValues.max_participants,
        waitlist_enabled: formValues.waitlist_enabled,
        max_waitlist_size: formValues.max_waitlist_size
      };
  
      const { data, error } = await supabase
        .from('courses')
        .insert(courseData)
        .select();
  
      if (error) throw error;
      toast({
        title: "Draft saved",
        description: "Your class has been saved as a draft.",
      });
    } catch (error) {
      handleError(error, {
        title: "Failed to save draft",
        description: "Please check your connection and try again.",
        position: "top-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitClass = async () => {
    try {
      setIsSubmitting(true);
      const formValues = form.getValues();

      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;
  
      // Prepare course data ensuring all types match the database schema
      const courseData = {
        instructor_id: userData.user.id,
        title: formValues.title || 'Untitled Course',
        description: formValues.description || 'No description',
        category: formValues.category || 'Uncategorized',
        location: formValues.location || 'Unknown',
        price: formValues.price || 0,
        duration: formValues.duration, // Already a string
        capacity: formValues.capacity,
        is_online: formValues.is_online,
        address: formValues.address,
        city: formValues.city,
        learning_outcomes: formValues.learning_outcomes,
        requirements: formValues.requirements,
        items_to_bring: formValues.items_to_bring,
        status: "published" as const,
        images: formValues.images,
        sessions: formValues.sessions,
        min_participants: formValues.min_participants,
        max_participants: formValues.max_participants,
        waitlist_enabled: formValues.waitlist_enabled,
        max_waitlist_size: formValues.max_waitlist_size
      };
  
      const { data, error } = await supabase
        .from('courses')
        .insert(courseData)
        .select();
  
      if (error) throw error;
      toast({
        title: "Class created",
        description: "Your class has been created and is now live!",
      });
      navigate('/teach/dashboard');
    } catch (error) {
      handleError(error, {
        title: "Failed to create class",
        description: "Please check your connection and try again.",
        position: "top-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    <GeneralInformation form={form} />,
    <ClassDetails form={form} />,
    <SessionsWrapper 
      sessions={sessions} 
      setSessions={setSessions} 
    />,
    <PricingAndLogistics form={form} />,
    <Media 
      form={form} 
    />,
  ];

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
        {steps[currentStep]}
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
