
import { useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClassItem } from '@/types/class';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { classFormSchema, ClassFormValues } from './ClassFormFields';

interface UseClassFormProps {
  classData: ClassItem;
  onSuccess: () => void;
  onClose: () => void;
}

interface UseClassFormReturn {
  form: UseFormReturn<ClassFormValues>;
  isSubmitting: boolean;
  onSubmit: (values: ClassFormValues) => Promise<void>;
}

export const useClassForm = ({ 
  classData, 
  onSuccess, 
  onClose 
}: UseClassFormProps): UseClassFormReturn => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Initialize the form with data from the class
  const form = useForm<ClassFormValues>({
    resolver: zodResolver(classFormSchema),
    defaultValues: {
      title: classData.title,
      description: classData.description || '',
      category: classData.category || '',
      price: classData.price,
      // Convert duration to string if it's a number
      duration: typeof classData.duration === 'number' 
        ? String(classData.duration) 
        : (classData.duration || "60"),
      // Provide a default status value
      status: "draft",
    },
  });

  const onSubmit = async (values: ClassFormValues) => {
    try {
      setIsSubmitting(true);
      const courseData = {
        title: values.title,
        description: values.description,
        category: values.category,
        price: values.price,
        duration: values.duration,
        status: values.status,
      };

      const { error } = await supabase
        .from('courses')
        .update(courseData)
        .eq('id', classData.id);

      if (error) throw error;

      toast({
        title: 'Class updated',
        description: 'Your class information has been updated.',
      });
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error updating class:', error);
      toast({
        title: 'Error',
        description: 'Failed to update class. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    onSubmit
  };
};
