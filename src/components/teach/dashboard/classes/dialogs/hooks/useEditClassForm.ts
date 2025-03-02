
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

// Form schema definition
export const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number",
  }),
  minParticipants: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Minimum participants must be a positive number",
  }),
  maxParticipants: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Maximum participants must be a positive number",
  }),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
});

export type FormValues = z.infer<typeof formSchema>;

export const useEditClassForm = (classId: number | null, onSuccess?: () => void) => {
  const [loading, setLoading] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  
  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      minParticipants: "",
      maxParticipants: "",
      date: "",
      time: "",
    }
  });

  // Load class details when class ID changes
  useEffect(() => {
    if (classId) {
      loadClassDetails();
    }
  }, [classId]);

  const loadClassDetails = async () => {
    if (!classId) return;

    try {
      setLoading(true);
      const { data: course, error } = await supabase
        .from('courses')
        .select(`
          *,
          course_sessions (
            start_time
          )
        `)
        .eq('id', classId)
        .single();

      if (error) throw error;

      if (course) {
        const startTime = course.course_sessions?.[0]?.start_time;
        const date = startTime ? new Date(startTime) : new Date();

        form.reset({
          title: course.title,
          description: course.description,
          price: course.price.toString(),
          minParticipants: course.min_participants?.toString() || "1",
          maxParticipants: course.max_participants?.toString() || "10",
          date: date.toISOString().split('T')[0],
          time: date.toTimeString().slice(0, 5),
        });
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to load class details");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (values: FormValues) => {
    if (!classId) return;

    try {
      setLoading(true);

      // Combine date and time
      const dateTime = new Date(`${values.date}T${values.time}`);

      // Update course details
      const { error: courseError } = await supabase
        .from('courses')
        .update({
          title: values.title,
          description: values.description,
          price: Number(values.price),
          min_participants: Number(values.minParticipants),
          max_participants: Number(values.maxParticipants),
        })
        .eq('id', classId);

      if (courseError) throw courseError;

      // Update session timing
      const { error: sessionError } = await supabase
        .from('course_sessions')
        .update({
          start_time: dateTime.toISOString(),
        })
        .eq('course_id', classId);

      if (sessionError) throw sessionError;

      toast.success("Class updated successfully");
      onSuccess?.();
      return true;
    } catch (error: any) {
      toast.error(error.message || "Failed to update class");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleCancelCourse = async () => {
    if (!classId) return;

    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('courses')
        .update({
          status: 'archived' // Changed from 'cancelled' to 'archived'
        })
        .eq('id', classId);

      if (error) throw error;

      toast.success("Course cancelled successfully");
      onSuccess?.();
      return true;
    } catch (error: any) {
      toast.error(error.message || "Failed to cancel course");
      return false;
    } finally {
      setLoading(false);
      setShowCancelDialog(false);
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
