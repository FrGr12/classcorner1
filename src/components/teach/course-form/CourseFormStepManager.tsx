
import React from 'react';
import { Form } from '@/components/ui/form';
import { useToast } from "@/hooks/use-toast";
import { useCourseForm } from './CourseFormContext';

interface CourseFormStepManagerProps {
  children: React.ReactNode;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

const CourseFormStepManager = ({ 
  children,
  isSubmitting,
  setIsSubmitting
}: CourseFormStepManagerProps) => {
  const { toast } = useToast();
  const { form } = useCourseForm();
  
  // Only pass children without additional props
  return (
    <Form {...form}>
      {children}
    </Form>
  );
};

export default CourseFormStepManager;
