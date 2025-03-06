
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseFormSchema, CourseFormValues } from "../CourseFormContext";
import { Session } from "@/types/session";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useCreateClassForm = (
  isSubmitting: boolean, 
  setIsSubmitting: (value: boolean) => void,
  draftCount: number,
  userId: string | null
) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentStepString, setCurrentStepString] = useState("general");
  const [sessions, setSessions] = useState<Session[]>([]);
  const totalSteps = 5; // Total number of steps in the form

  // Initialize form with zod resolver
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      location: "",
      is_online: false,
      capacity: 5,
      price: 0,
      duration: "60",
      sessions: [],
      learning_outcomes: [""],
      requirements: [""],
      items_to_bring: [""],
      images: [],
      status: "draft",
      min_participants: 1,
      max_participants: 10,
      waitlist_enabled: false,
      private_bookings_enabled: false,
      group_bookings_enabled: false
    }
  });

  // Navigation functions
  const goToNextStep = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
      
      // Update step string based on index
      const stepStrings = ["general", "details", "sessions", "pricing", "media"];
      setCurrentStepString(stepStrings[currentStep + 1]);
    }
  }, [currentStep, totalSteps]);

  const goToPreviousStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      
      // Update step string based on index
      const stepStrings = ["general", "details", "sessions", "pricing", "media"];
      setCurrentStepString(stepStrings[currentStep - 1]);
    }
  }, [currentStep]);

  // Form submission handlers
  const handleSubmitDraft = useCallback(async () => {
    try {
      if (!userId) {
        toast.error("You need to be logged in to save a draft");
        return;
      }

      setIsSubmitting(true);
      
      // Get form values
      const values = form.getValues();
      
      // Add sessions info
      values.sessions = sessions;
      
      // Set status to draft
      values.status = "draft";
      
      console.log("Submitting draft with values:", values);
      
      // Insert into Supabase
      const { data, error } = await supabase
        .from('courses')
        .insert({
          ...values,
          instructor_id: userId
        })
        .select()
        .single();
      
      if (error) throw error;
      
      toast.success("Draft saved successfully!");
      console.log("Draft saved:", data);
      
      // Reset form after successful submission if needed
      // form.reset();
      
    } catch (error: any) {
      console.error("Error saving draft:", error);
      toast.error(`Failed to save draft: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  }, [form, sessions, setIsSubmitting, userId]);

  const handleSubmitClass = useCallback(async () => {
    try {
      if (!userId) {
        toast.error("You need to be logged in to publish a class");
        return;
      }

      setIsSubmitting(true);
      
      // Validate all fields
      const valid = await form.trigger();
      if (!valid) {
        toast.error("Please fill in all required fields");
        setIsSubmitting(false);
        return;
      }
      
      // Get form values
      const values = form.getValues();
      
      // Add sessions info
      values.sessions = sessions;
      
      // Set status to published
      values.status = "published";
      
      console.log("Publishing class with values:", values);
      
      // Insert into Supabase
      const { data, error } = await supabase
        .from('courses')
        .insert({
          ...values,
          instructor_id: userId
        })
        .select()
        .single();
      
      if (error) throw error;
      
      toast.success("Class published successfully!");
      console.log("Class published:", data);
      
      // Reset form after successful submission
      form.reset();
      setSessions([]);
      setCurrentStep(0);
      setCurrentStepString("general");
      
    } catch (error: any) {
      console.error("Error publishing class:", error);
      toast.error(`Failed to publish class: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  }, [form, sessions, setIsSubmitting, userId]);

  return {
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
  };
};
