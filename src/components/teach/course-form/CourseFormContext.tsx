
import { createContext, useState, ReactNode, useContext } from "react";
import { UseFormReturn } from "react-hook-form";

type CourseFormContextType = {
  form: UseFormReturn<any>;
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
  form: UseFormReturn<any>;
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
