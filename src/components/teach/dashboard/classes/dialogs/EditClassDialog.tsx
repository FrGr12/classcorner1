import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { CourseFormValues } from "@/components/teach/course-form/CourseFormContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { handleError } from "@/utils/errorHandler";

interface EditClassDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  courseId: number;
  initialValues: CourseFormValues;
}

export const EditClassDialog = ({
  isOpen,
  onOpenChange,
  courseId,
  initialValues,
}: EditClassDialogProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: CourseFormValues): Promise<boolean> => {
    try {
      setIsSubmitting(true);
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return false;

      const { error } = await supabase
        .from('courses')
        .update({
          ...values,
          instructor_id: userData.user.id,
        })
        .eq('id', courseId);

      if (error) throw error;

      toast({
        title: "Class Updated",
        description: "Your class has been successfully updated.",
      });
      onOpenChange(false);
      return true;
    } catch (error: any) {
      handleError(error, {
        title: "Failed to update class",
        description: error.message,
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = async (): Promise<boolean> => {
    try {
      setIsSubmitting(true);
      onOpenChange(false);
      return true;
    } catch (error: any) {
      handleError(error, {
        title: "Failed to cancel",
        description: error.message,
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsSubmitting(true);
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', courseId);

      if (error) throw error;

      toast({
        title: "Class Deleted",
        description: "Your class has been successfully deleted.",
      });
      onOpenChange(false);
    } catch (error: any) {
      handleError(error, {
        title: "Failed to delete class",
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost">Edit</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Class</AlertDialogTitle>
          <AlertDialogDescription>
            Make changes to your class details. Be careful with what you
            modify.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {/* <EditClassForm
          courseId={courseId}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          onCancel={handleCancel}
        /> */}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isSubmitting}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
