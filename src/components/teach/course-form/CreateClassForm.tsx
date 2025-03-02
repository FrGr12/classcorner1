import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateClassSchema, CreateClassFormValues } from "@/lib/validators/create-class";
import { CourseFormContext } from "./CourseFormContext";
import CourseFormStepManager from "./CourseFormStepManager";
import GeneralInformation from "./sections/GeneralInformation";
import ClassDetails from "./sections/ClassDetails";
import SessionsWrapper from "./sections/SessionsWrapper";
import PricingAndLogistics from "./sections/PricingAndLogistics";
import Media from "./sections/Media";
import { Button } from "@/components/ui/button";
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
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

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
      duration: 60,
      sessions: [],
      learning_outcomes: [''],
      requirements: [''],
      items_to_bring: [''],
      images: [],
      status: 'draft',
    },
    mode: "onChange",
  });

  const { watch, getValues } = form;

  // Form step navigation
  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const totalSteps = 5;

  const handleSubmitDraft = async () => {
    try {
      const formValues = form.getValues();
      // Cast images to any to avoid type errors during transition
      const fixedFormValues = {
        ...formValues,
        images: formValues.images as any
      };

      setIsSubmitting(true);
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;
  
      const { data, error } = await supabase
        .from('courses')
        .insert([
          { 
            ...fixedFormValues,
            instructor_id: userData.user.id,
          }
        ])
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
      const fixedFormValues = {
        ...formValues,
        images: formValues.images as any
      };

      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;
  
      const { data, error } = await supabase
        .from('courses')
        .insert([
          { 
            ...fixedFormValues,
            instructor_id: userData.user.id,
            status: 'published',
          }
        ])
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

  const steps: any[] = [
    {
      label: 'General Info',
      component: <GeneralInformation form={form} />,
    },
    {
      label: 'Class Details',
      component: <ClassDetails form={form} />,
    },
    {
      label: 'Sessions',
      component: <SessionsWrapper 
        sessions={watch("sessions")} 
        setSessions={(sessions: Session[]) => form.setValue("sessions", sessions)} 
      />,
    },
    {
      label: 'Pricing & Logistics',
      component: <PricingAndLogistics form={form} />,
    },
    {
      label: 'Media',
      component: <Media 
        form={form} 
        imagesPreview={imagesPreview}
        setImagesPreview={setImagesPreview}
      />,
    },
  ];

  return (
    <CourseFormContext.Provider value={{ form, currentStep, setCurrentStep, imagesPreview, setImagesPreview }}>
      <CourseFormStepManager 
        currentStep={currentStep} 
        totalSteps={totalSteps} 
        steps={steps} 
      />

      <FormActions 
        currentStep={currentStep}
        totalSteps={totalSteps}
        isSubmitting={isSubmitting}
        onPrevious={prevStep}
        onNext={nextStep}
        onSaveDraft={handleSubmitDraft}
        onSubmit={handleSubmitClass}
      />
    </CourseFormContext.Provider>
  );
};

export default CreateClassForm;
