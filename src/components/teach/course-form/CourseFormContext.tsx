
import React, { createContext, useContext, ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";

export interface CourseFormValues {
  title: string;
  description: string;
  category: string;
  location: string;
  locationType: "inPerson" | "online" | "hybrid";
  address: string;
  city: string;
  state: string;
  zipCode: string;
  onlineLink: string;
  classDetails: string;
  difficultyLevel: "beginner" | "intermediate" | "advanced" | "allLevels";
  price: string;
  capacity: string;
  minParticipants: number;
  maxParticipants: number;
  images: string[];
  scheduleType: "oneTime" | "recurring" | "flexibleDates";
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  recurringDays: string[];
  whatToBring: string[];
  learningOutcomes: string[];
}

interface CourseFormContextType {
  form: UseFormReturn<CourseFormValues>;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
  currentStep: string;
  setCurrentStep: (step: string) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
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
      }}
    >
      {children}
    </CourseFormContext.Provider>
  );
};
