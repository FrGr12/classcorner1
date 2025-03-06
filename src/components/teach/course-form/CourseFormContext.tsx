
import React, { createContext, useContext, ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";
import { Session } from "@/types/session";
import * as z from "zod";

// Define the schema for form validation
export const courseFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  location: z.string().min(1, "Location is required"),
  address: z.string().optional(),
  city: z.string().optional(),
  is_online: z.boolean().default(false),
  capacity: z.number().int().positive().default(1),
  price: z.number().nonnegative().default(0),
  duration: z.string().default("60"), // Changed to string only to match database expectation
  sessions: z.array(z.any()).default([]),
  learning_outcomes: z.array(z.string()).default(['']),
  requirements: z.array(z.string()).default(['']),
  items_to_bring: z.array(z.string()).default(['']),
  images: z.array(z.any()).default([]),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  // Add these fields to match what's in the DB
  min_participants: z.number().int().positive().default(1),
  max_participants: z.number().int().positive().default(10),
  waitlist_enabled: z.boolean().default(false),
  max_waitlist_size: z.number().int().nonnegative().optional(),
  private_bookings_enabled: z.boolean().default(false),
  group_bookings_enabled: z.boolean().default(false),
  // Add the instructor_id field
  instructor_id: z.string().optional()
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
