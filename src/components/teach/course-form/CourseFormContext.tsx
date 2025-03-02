import React, { createContext, useContext, ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";
import { Session } from "@/types/session";

export interface CourseFormValues {
  title: string;
  description: string;
  category: string;
  location: string;
  address: string;
  city: string;
  is_online: boolean;
  capacity: number;
  price: number;
  duration: number;
  sessions: Session[];
  learning_outcomes: string[];
  requirements: string[];
  items_to_bring: string[];
  images: string[] | File[];
  status: 'draft' | 'published';
}

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

const CourseFormContext = createContext<CourseFormContextType | undefined>(undefined);

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
