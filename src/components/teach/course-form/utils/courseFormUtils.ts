
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { NavigateFunction } from "react-router-dom";

interface CourseFormValues {
  title: string;
  description: string;
  category: string;
  location: string;
  locationType: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  onlineLink: string;
  classDetails: string;
  difficultyLevel: string;
  price: string;
  capacity: string;
  images: File[];
  scheduleType: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  recurringDays: string[];
  whatToBring: string[];
  learningOutcomes: string[];
  minParticipants?: number;
  maxParticipants?: number;
}

export const saveDraftCourse = async (
  form: UseFormReturn<CourseFormValues>,
  sessions: any[],
  setIsSubmitting: (state: boolean) => void
) => {
  setIsSubmitting(true);
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error("Not authenticated");

    const formValues = form.getValues();
    
    const courseData = {
      instructor_id: userData.user.id,
      title: formValues.title,
      description: formValues.description,
      category: formValues.category,
      location: formValues.location,
      location_type: formValues.locationType,
      address: formValues.address,
      city: formValues.city,
      state: formValues.state,
      zip_code: formValues.zipCode,
      online_link: formValues.onlineLink,
      class_details: formValues.classDetails,
      difficulty_level: formValues.difficultyLevel,
      price: parseFloat(formValues.price) || 0,
      capacity: parseInt(formValues.capacity) || 0,
      max_participants: formValues.maxParticipants,
      min_participants: formValues.minParticipants,
      images: formValues.images,
      schedule_type: formValues.scheduleType,
      start_date: formValues.startDate,
      end_date: formValues.endDate,
      start_time: formValues.startTime,
      end_time: formValues.endTime,
      recurring_days: formValues.recurringDays,
      what_to_bring: formValues.whatToBring,
      learning_outcomes: formValues.learningOutcomes,
      sessions: sessions,
      status: 'draft' as 'draft' | 'published' | 'archived'
    };

    const { data: existingDraft } = await supabase
      .from('courses')
      .select('id')
      .eq('instructor_id', userData.user.id)
      .eq('status', 'draft')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (existingDraft) {
      const { error } = await supabase
        .from('courses')
        .update(courseData)
        .eq('id', existingDraft.id);

      if (error) throw error;
      toast.success("Draft saved successfully!");
    } else {
      const { error } = await supabase
        .from('courses')
        .insert(courseData);

      if (error) throw error;
      toast.success("Draft saved successfully!");
    }
  } catch (error: any) {
    toast.error(error.message || "Error saving draft");
  } finally {
    setIsSubmitting(false);
  }
};

export const submitCourse = async (
  form: UseFormReturn<CourseFormValues>,
  sessions: any[],
  setIsSubmitting: (state: boolean) => void,
  navigate: NavigateFunction
) => {
  setIsSubmitting(true);
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error("Not authenticated");
    
    const formValues = form.getValues();

    if (
      !formValues.title ||
      !formValues.description ||
      !formValues.category ||
      !formValues.classDetails ||
      !formValues.price ||
      !formValues.capacity ||
      !formValues.images.length ||
      !formValues.startDate ||
      !formValues.startTime ||
      !formValues.endTime ||
      (formValues.scheduleType === 'recurring' && !formValues.recurringDays.length)
    ) {
      toast.error("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    const courseData = {
      instructor_id: userData.user.id,
      title: formValues.title,
      description: formValues.description,
      category: formValues.category,
      location: formValues.location,
      location_type: formValues.locationType,
      address: formValues.address,
      city: formValues.city,
      state: formValues.state,
      zip_code: formValues.zipCode,
      online_link: formValues.onlineLink,
      class_details: formValues.classDetails,
      difficulty_level: formValues.difficultyLevel,
      price: parseFloat(formValues.price) || 0,
      capacity: parseInt(formValues.capacity) || 0,
      max_participants: formValues.maxParticipants,
      min_participants: formValues.minParticipants,
      images: formValues.images,
      schedule_type: formValues.scheduleType,
      start_date: formValues.startDate,
      end_date: formValues.endDate,
      start_time: formValues.startTime,
      end_time: formValues.endTime,
      recurring_days: formValues.recurringDays,
      what_to_bring: formValues.whatToBring,
      learning_outcomes: formValues.learningOutcomes,
      sessions: sessions,
      status: 'published' as 'draft' | 'published' | 'archived',
      published_at: new Date().toISOString()
    };

    const { data: existingDraft } = await supabase
      .from('courses')
      .select('id')
      .eq('instructor_id', userData.user.id)
      .eq('status', 'draft')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (existingDraft) {
      const { error } = await supabase
        .from('courses')
        .update(courseData)
        .eq('id', existingDraft.id);

      if (error) throw error;
      toast.success("Class created successfully!");
    } else {
      const { error } = await supabase
        .from('courses')
        .insert(courseData);

      if (error) throw error;
      toast.success("Class created successfully!");
    }

    navigate('/dashboard');
  } catch (error: any) {
    toast.error(error.message || "Error creating class");
  } finally {
    setIsSubmitting(false);
  }
};
