
import React, { createContext, useContext, ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";
import { Session } from "@/types/session";
import * as z from "zod";

// Define the schema for form validation - matching our CreateClassSchema
export const courseFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  location: z.string().min(1, "Location is required"),
  address: z.string().optional(),
  city: z.string().optional(),
  is_online: z.boolean().default(false),
  capacity: z.number().int().positive(),
  price: z.number().nonnegative(),
  duration: z.string().default("60"), // Ensure string type to match DB schema
  sessions: z.array(z.any()),
  learning_outcomes: z.array(z.string()),
  requirements: z.array(z.string()),
  items_to_bring: z.array(z.string()),
  images: z.array(z.any()),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  min_participants: z.number().int().positive().optional(),
  max_participants: z.number().int().positive().optional(),
  waitlist_enabled: z.boolean().optional(),
  max_waitlist_size: z.number().int().positive().optional(),
});

export type CourseFormValues = z.infer<typeof courseFormSchema>;

interface CourseFormContextType {
  form: UseFormReturn<CourseFormValues>;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
  currentStep: string;
  setCurrentStep: (step: string) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  sessions: Session[];
  setSessions: (sessions: Session[]) => void;
}

export const CourseFormContext = createContext<CourseFormContextType | undefined>(undefined);

export const useCourseForm = () => {
  const context = useContext(CourseFormContext);
  if (!context) {
    throw new Error("useCourseForm must be used within a CourseFormProvider");
  }
  return context;
};

interface CourseFormProviderProps {
  children: ReactNode;
  form: UseFormReturn<CourseFormValues>;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
  currentStep: string;
  setCurrentStep: (step: string) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  sessions: Session[];
  setSessions: (sessions: Session[]) => void;
}

export const CourseFormProvider: React.FC<CourseFormProviderProps> = ({
  children,
  form,
  isSubmitting,
  setIsSubmitting,
  currentStep,
  setCurrentStep,
  goToNextStep,
  goToPreviousStep,
  sessions,
  setSessions,
}) => {
  return (
    <CourseFormContext.Provider
      value={{
        form,
        isSubmitting,
        setIsSubmitting,
        currentStep,
        setCurrentStep,
        goToNextStep,
        goToPreviousStep,
        sessions,
        setSessions,
      }}
    >
      {children}
    </CourseFormContext.Provider>
  );
};
