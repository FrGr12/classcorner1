
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { CourseFormValues, courseFormSchema } from "../CourseFormContext";
import { handleError } from "@/utils/errorHandler";
import { Session } from "@/types/session";

export const useCreateClassForm = (
  isSubmitting: boolean,
  setIsSubmitting: (value: boolean) => void,
  draftCount: number
) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [sessions, setSessions] = useState<Session[]>([]);

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
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
      duration: "60", // Store as string to match database
      sessions: [],
      learning_outcomes: [''],
      requirements: [''],
      items_to_bring: [''],
      images: [],
      status: 'draft',
      min_participants: 1,
      max_participants: 10,
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
      
      // Since we're bypassing auth, let's use a mock instructor ID
      const mockInstructorId = "instructor456";
  
      // Make sure we're providing all required fields
      const courseData = {
        instructor_id: mockInstructorId,
        title: formValues.title || 'Untitled Course',
        description: formValues.description || 'No description',
        category: formValues.category || 'Uncategorized',
        location: formValues.location || 'Unknown',
        price: formValues.price || 0,
        duration: String(formValues.duration), // Ensure duration is always a string
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
        max_participants: formValues.max_participants
      };
      
      // For demo purposes, just show a success toast instead of calling the database
      setTimeout(() => {
        toast({
          title: "Draft saved",
          description: "Your class has been saved as a draft.",
        });
        setIsSubmitting(false);
      }, 1500);
    } catch (error) {
      handleError(error, {
        title: "Failed to save draft",
        description: "Please check your connection and try again.",
        position: "top-right",
      });
      setIsSubmitting(false);
    }
  };

  const handleSubmitClass = async () => {
    try {
      setIsSubmitting(true);
      const formValues = form.getValues();

      // Since we're bypassing auth, let's use a mock instructor ID
      const mockInstructorId = "instructor456";
  
      // Make sure we're providing all required fields
      const courseData = {
        instructor_id: mockInstructorId,
        title: formValues.title || 'Untitled Course',
        description: formValues.description || 'No description',
        category: formValues.category || 'Uncategorized',
        location: formValues.location || 'Unknown',
        price: formValues.price || 0,
        duration: String(formValues.duration), // Ensure duration is always a string
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
        max_participants: formValues.max_participants
      };
      
      // For demo purposes, just show a success toast instead of calling the database
      setTimeout(() => {
        toast({
          title: "Class created",
          description: "Your class has been created and is now live!",
        });
        navigate('/dashboard');
        setIsSubmitting(false);
      }, 1500);
    } catch (error) {
      handleError(error, {
        title: "Failed to create class",
        description: "Please check your connection and try again.",
        position: "top-right",
      });
      setIsSubmitting(false);
    }
  };

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
