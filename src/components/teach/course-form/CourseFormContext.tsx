
import React, { createContext, useContext } from "react";
import { UseFormReturn } from "react-hook-form";

// Define the type for form values properly
export interface CourseFormValues {
  title: string;
  description: string;
  category: string;
  location: string;
  locationType: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  onlineLink: string;
  classDetails: string;
  difficultyLevel: string;
  price: string;
  capacity: string;
  minParticipants: number;
  maxParticipants: number;
  images: File[];
  scheduleType: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  recurringDays: string[];
  whatToBring: string[];
  learningOutcomes: string[];
}

// Create context with properly typed values
interface CourseFormContextType {
  form: UseFormReturn<CourseFormValues>;
  sessions: any[];
  setSessions: (sessions: any[]) => void;
}

const CourseFormContext = createContext<CourseFormContextType | undefined>(undefined);

export const CourseFormProvider = ({ 
  children, 
  form, 
  sessions, 
  setSessions 
}: { 
  children: React.ReactNode;
  form: UseFormReturn<CourseFormValues>;
  sessions: any[];
  setSessions: (sessions: any[]) => void;
}) => {
  return (
    <CourseFormContext.Provider value={{ form, sessions, setSessions }}>
      {children}
    </CourseFormContext.Provider>
  );
};

export const useCourseForm = () => {
  const context = useContext(CourseFormContext);
  if (!context) {
    throw new Error("useCourseForm must be used within a CourseFormProvider");
  }
  return context;
};
