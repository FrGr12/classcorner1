
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { duplicateClassFormSchema, DuplicateClassFormData } from "@/types/duplicate-class";
import { Session } from "@/types/session";

export const useDuplicateClassForm = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [draftCount, setDraftCount] = useState(0);

  const form = useForm<DuplicateClassFormData>({
    resolver: zodResolver(duplicateClassFormSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      minParticipants: 0,
      maxParticipants: 0,
      location: "",
      category: "",
      whatToBring: [],
      learningOutcomes: [],
    },
    mode: "onChange"
  });

  const onSubmit = async (data: DuplicateClassFormData) => {
    try {
      setIsSubmitting(true);
      
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      if (!userData.user) {
        toast.error("You must be logged in to create a class");
        return;
      }

      // Insert course data
      const { data: course, error: courseError } = await supabase
        .from('courses')
        .insert({
          title: data.title,
          description: data.description,
          price: data.price,
          max_participants: data.maxParticipants,
          location: data.location,
          category: data.category,
          instructor_id: userData.user.id,
          what_to_bring: data.whatToBring,
          learning_outcomes: data.learningOutcomes,
          status: 'published'
        })
        .select()
        .single();

      if (courseError) throw courseError;

      // Insert sessions
      if (sessions.length > 0) {
        const formattedSessions = sessions.map(session => ({
          course_id: course.id,
          start_time: session.start.toISOString(),
          is_recurring: session.isRecurring,
          recurrence_pattern: session.recurrencePattern,
          recurrence_end_date: session.recurrenceEndDate?.toISOString(),
          recurrence_count: session.recurrenceCount
        }));

        const { error: sessionsError } = await supabase
          .from('course_sessions')
          .insert(formattedSessions);

        if (sessionsError) throw sessionsError;
      }

      // Upload images if any
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          const image = images[i];
          const fileExt = image.name.split('.').pop();
          const filePath = `${course.id}/${Math.random()}.${fileExt}`;
          
          const { error: uploadError } = await supabase.storage
            .from('course-images')
            .upload(filePath, image);

          if (uploadError) throw uploadError;

          // Insert image reference
          const { error: imageError } = await supabase
            .from('course_images')
            .insert({
              course_id: course.id,
              image_path: filePath,
              display_order: i
            });

          if (imageError) throw imageError;
        }
      }

      toast.success("Class published successfully!");
      navigate("/dashboard/classes");
    } catch (error) {
      console.error("Error creating class:", error);
      toast.error("Failed to create class. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveDraft = async () => {
    try {
      setIsSubmitting(true);
      const formData = form.getValues();
      
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      if (!userData.user) {
        toast.error("You must be logged in to save a draft");
        return;
      }

      const { error: courseError } = await supabase
        .from('courses')
        .insert({
          title: formData.title,
          description: formData.description,
          price: formData.price,
          max_participants: formData.maxParticipants,
          location: formData.location,
          category: formData.category,
          instructor_id: userData.user.id,
          what_to_bring: formData.whatToBring,
          learning_outcomes: formData.learningOutcomes,
          status: 'draft'
        });

      if (courseError) throw courseError;

      toast.success("Class saved as draft");
      setDraftCount(prev => prev + 1);
      navigate("/dashboard/classes");
    } catch (error) {
      console.error("Error saving draft:", error);
      toast.error("Failed to save draft. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    images,
    setImages,
    sessions,
    setSessions,
    isSubmitting,
    draftCount,
    onSubmit,
    saveDraft,
  };
};
