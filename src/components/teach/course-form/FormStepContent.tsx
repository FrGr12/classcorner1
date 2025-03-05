
import React from 'react';
import GeneralInformation from "./sections/GeneralInformation";
import ClassDetails from "./sections/ClassDetails";
import SessionsWrapper from "./sections/SessionsWrapper";
import PricingAndLogistics from "./sections/PricingAndLogistics";
import Media from "./sections/Media";
import { Session } from "@/types/session";
import { UseFormReturn } from "react-hook-form";
import { CourseFormValues } from "./CourseFormContext";

interface FormStepContentProps {
  currentStep: number;
  form: UseFormReturn<CourseFormValues>;
  sessions: Session[];
  setSessions: (sessions: Session[]) => void;
}

const FormStepContent: React.FC<FormStepContentProps> = ({
  currentStep,
  form,
  sessions,
  setSessions
}) => {
  const steps = [
    <GeneralInformation form={form} />,
    <ClassDetails form={form} />,
    <SessionsWrapper 
      sessions={sessions} 
      setSessions={setSessions} 
    />,
    <PricingAndLogistics form={form} />,
    <Media 
      form={form} 
    />,
  ];

  return steps[currentStep];
};

export default FormStepContent;
