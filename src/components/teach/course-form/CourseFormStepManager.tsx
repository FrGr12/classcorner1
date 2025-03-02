import { useState, useEffect, useCallback } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { CourseFormValues, courseFormSchema } from './CourseFormContext';
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
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const form = useFormContext<CourseFormValues>();
  const { watch } = useFormContext<CourseFormValues>();

  useEffect(() => {
    const prepareImagesPreview = async () => {
      if (isSubmitting) return;

      // Fix the type issue by safely casting the images
      const images = Array.isArray(watch('images')) 
        ? watch('images') as any 
        : [];

      if (images && images.length > 0) {
        const previewURLs = await Promise.all(
          images.map(async (image: File | string) => {
            if (typeof image === 'string') {
              return image; // It's already a URL
            } else {
              return new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.readAsDataURL(image);
              });
            }
          })
        );
        setImagesPreview(previewURLs);
      } else {
        setImagesPreview([]);
      }
    };

    prepareImagesPreview();
  }, [watch('images'), isSubmitting]);

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { imagesPreview });
        }
        return child;
      })}
    </>
  );
};

export default CourseFormStepManager;
