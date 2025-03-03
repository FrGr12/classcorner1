
import { Session } from "@/types/session";
import { UseFormReturn } from "react-hook-form";
import { CreateClassFormValues } from "@/lib/validators/create-class";
import GeneralInformation from "./sections/GeneralInformation";
import ClassDetails from "./sections/ClassDetails";
import SessionsWrapper from "./sections/SessionsWrapper";
import PricingAndLogistics from "./sections/PricingAndLogistics";
import Media from "./sections/Media";

interface StepContentProps {
  currentStep: number;
  form: UseFormReturn<CreateClassFormValues>;
  sessions: Session[];
  setSessions: (sessions: Session[]) => void;
}

const StepContent = ({ 
  currentStep, 
  form, 
  sessions, 
  setSessions 
}: StepContentProps) => {
  
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

export default StepContent;
