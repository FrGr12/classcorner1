
import { createContext, ReactNode, useContext } from "react";
import { UseFormReturn } from "react-hook-form";

export type CourseFormValues = {
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
  minParticipants?: number;
  maxParticipants?: number;
  images: File[];
  scheduleType: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  recurringDays: string[];
  whatToBring: string[];
  learningOutcomes: string[];
};

type CourseFormContextType = {
  form: UseFormReturn<CourseFormValues>;
  sessions: any[];
  setSessions: (sessions: any[]) => void;
};

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
  sessions: any[];
  setSessions: (sessions: any[]) => void;
}

export const CourseFormProvider = ({
  children,
  form,
  sessions,
  setSessions,
}: CourseFormProviderProps) => {
  return (
    <CourseFormContext.Provider value={{ form, sessions, setSessions }}>
      {children}
    </CourseFormContext.Provider>
  );
};
