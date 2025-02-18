
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Loader2, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import BasicInfoSection from "./edit-course/BasicInfoSection";
import LocationCategorySection from "./edit-course/LocationCategorySection";
import PricingCapacitySection from "./edit-course/PricingCapacitySection";
import WaitlistSection from "./edit-course/WaitlistSection";
import SchedulingSection from "./edit-course/SchedulingSection";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  location: z.string().min(1, "Location is required"),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number",
  }),
  maxParticipants: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Maximum participants must be a positive number",
  }),
  waitlistEnabled: z.boolean().optional(),
  maxWaitlistSize: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  startTime: z.string().min(1, "Start time is required"),
});

interface EditCourseFormProps {
  initialData: any;
}

const EditCourseForm = ({ initialData }: EditCourseFormProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData.title,
      description: initialData.description,
      category: initialData.category,
      location: initialData.location,
      price: initialData.price.toString(),
      maxParticipants: initialData.max_participants?.toString() || "",
      waitlistEnabled: initialData.waitlist_enabled || false,
      maxWaitlistSize: initialData.max_waitlist_size?.toString() || "",
      startDate: initialData.course_sessions?.[0]?.start_time 
        ? new Date(initialData.course_sessions[0].start_time).toISOString().split('T')[0] 
        : "",
      startTime: initialData.course_sessions?.[0]?.start_time 
        ? new Date(initialData.course_sessions[0].start_time).toTimeString().slice(0, 5)
        : "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      toast.loading("Updating your course...");

      const { error: courseError } = await supabase
        .from("courses")
        .update({
          title: values.title,
          description: values.description,
          price: Number(values.price),
          location: values.location,
          category: values.category,
          max_participants: Number(values.maxParticipants),
          waitlist_enabled: values.waitlistEnabled,
          max_waitlist_size: values.maxWaitlistSize ? Number(values.maxWaitlistSize) : null,
        })
        .eq('id', initialData.id);

      if (courseError) throw courseError;

      if (initialData.course_sessions?.[0]?.id) {
        const combinedDateTime = new Date(`${values.startDate}T${values.startTime}`);
        
        const { error: sessionError } = await supabase
          .from("course_sessions")
          .update({
            start_time: combinedDateTime.toISOString(),
          })
          .eq('id', initialData.course_sessions[0].id);

        if (sessionError) throw sessionError;
      }

      toast.success("Course updated successfully!");
      navigate(`/class/${values.category}/${initialData.id}`);
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("Failed to update course. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelCourse = async () => {
    try {
      setIsLoading(true);
      
      const { error: courseError } = await supabase
        .from("courses")
        .update({
          status: 'archived'
        })
        .eq('id', initialData.id);

      if (courseError) throw courseError;

      toast.success("Course cancelled successfully");
      navigate("/dashboard/classes");
    } catch (error) {
      console.error("Error cancelling course:", error);
      toast.error("Failed to cancel course");
    } finally {
      setIsLoading(false);
      setShowCancelDialog(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <BasicInfoSection form={form} />
          <LocationCategorySection form={form} />
          <PricingCapacitySection form={form} />
          <SchedulingSection form={form} />
          <WaitlistSection form={form} />

          <div className="flex justify-between gap-4">
            <Button
              type="button"
              variant="destructive"
              onClick={() => setShowCancelDialog(true)}
              disabled={isLoading}
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              Cancel Course
            </Button>

            <Button
              type="submit"
              className="bg-accent-purple hover:bg-accent-purple/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating Course...
                </>
              ) : (
                "Update Course"
              )}
            </Button>
          </div>
        </form>
      </Form>

      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will cancel the course and notify all registered participants.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelCourse}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes, cancel course
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EditCourseForm;
