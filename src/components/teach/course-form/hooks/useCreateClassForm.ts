
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateClassSchema, CreateClassFormValues } from "@/lib/validators/create-class";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Session } from "@/types/session";
import { handleError } from "@/utils/errorHandler";

export const useCreateClassForm = (
  isSubmitting: boolean,
  setIsSubmitting: (isSubmitting: boolean) => void
) => {
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
      duration: "60", // Consistently use string for duration
      sessions: [],
      learning_outcomes: [''],
      requirements: [''],
      items_to_bring: [''],
      images: [],
      status: 'draft',
      maxParticipants: 10,
      minParticipants: 1
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
      // Format form values to match database structure
      setIsSubmitting(true);
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;
  
      // Make sure we're providing all required fields
      const courseData = {
        instructor_id: userData.user.id,
        title: formValues.title || 'Untitled Course',
        description: formValues.description || 'No description',
        category: formValues.category || 'Uncategorized',
        location: formValues.location || 'Unknown',
        price: formValues.price || 0,
        duration: formValues.duration.toString(), // Ensure duration is a string
        capacity: formValues.capacity,
        is_online: formValues.is_online,
        address: formValues.address,
        city: formValues.city,
        learning_outcomes: formValues.learning_outcomes,
        requirements: formValues.requirements,
        items_to_bring: formValues.items_to_bring,
        max_participants: formValues.maxParticipants,
        min_participants: formValues.minParticipants,
        status: "draft" as "draft" | "published" | "archived", // Fix type issue by using literal type
        images: formValues.images,
        sessions: formValues.sessions
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
  
      // Make sure we're providing all required fields
      const courseData = {
        instructor_id: userData.user.id,
        title: formValues.title || 'Untitled Course',
        description: formValues.description || 'No description',
        category: formValues.category || 'Uncategorized',
        location: formValues.location || 'Unknown',
        price: formValues.price || 0,
        duration: formValues.duration.toString(), // Ensure duration is a string
        capacity: formValues.capacity,
        is_online: formValues.is_online,
        address: formValues.address,
        city: formValues.city,
        learning_outcomes: formValues.learning_outcomes,
        requirements: formValues.requirements,
        items_to_bring: formValues.items_to_bring,
        max_participants: formValues.maxParticipants,
        min_participants: formValues.minParticipants,
        status: "published" as "draft" | "published" | "archived", // Fix type issue by using literal type
        images: formValues.images,
        sessions: formValues.sessions
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

  return {
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
  };
};
