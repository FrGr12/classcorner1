
import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { CourseFormValues } from './CourseFormContext';
import { useToast } from "@/hooks/use-toast";
import { Session } from '@/types/session';

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
  const { watch } = useFormContext<CourseFormValues>();

  // Only pass children without additional props
  return <>{children}</>;
};

export default CourseFormStepManager;
