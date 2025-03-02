
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

export interface FormValues {
  title?: string;
  description?: string;
  price?: string;
  date?: string;
  minParticipants?: string;
  maxParticipants?: string;
  time?: string;
}

export const useEditClassForm = (classId: number | null, onSuccess?: () => void) => {
  const [loading, setLoading] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      date: "",
      minParticipants: "",
      maxParticipants: "",
      time: ""
    }
  });

  const onSubmit = async (values: FormValues): Promise<boolean> => {
    if (!classId) return false;
    
    try {
      setLoading(true);
      // Mock API call - replace with real API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Updating class:", { classId, ...values });
      
      toast({
        title: "Class updated",
        description: "Your class has been updated successfully."
      });
      
      if (onSuccess) {
        onSuccess();
      }
      
      return true;
    } catch (error) {
      console.error("Error updating class:", error);
      toast({
        title: "Error",
        description: "Failed to update class. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleCancelCourse = async (): Promise<boolean> => {
    if (!classId) return false;
    
    try {
      setLoading(true);
      // Mock API call - replace with real API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Cancelling class:", classId);
      
      toast({
        title: "Class cancelled",
        description: "Your class has been cancelled and all participants have been notified."
      });
      
      if (onSuccess) {
        onSuccess();
      }
      
      return true;
    } catch (error) {
      console.error("Error cancelling class:", error);
      toast({
        title: "Error",
        description: "Failed to cancel class. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    showCancelDialog,
    setShowCancelDialog,
    onSubmit,
    handleCancelCourse
  };
};
