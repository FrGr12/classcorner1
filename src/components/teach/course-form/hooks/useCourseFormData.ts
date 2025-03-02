
import { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { CourseFormValues } from "../CourseFormContext";

export const useCourseFormData = (form: UseFormReturn<CourseFormValues>) => {
  const [sessions, setSessions] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchDraft = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      const { data: draft } = await supabase
        .from('courses')
        .select('*')
        .eq('instructor_id', userData.user.id)
        .eq('status', 'draft')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (draft) {
        form.reset({
          title: draft.title || "",
          description: draft.description || "",
          category: draft.category || "",
          location: draft.location || "",
          locationType: draft.location_type || "inPerson",
          address: draft.address || "",
          city: draft.city || "",
          state: draft.state || "",
          zipCode: draft.zip_code || "",
          onlineLink: draft.online_link || "",
          classDetails: draft.class_details || "",
          difficultyLevel: draft.difficulty_level || "beginner",
          price: draft.price ? draft.price.toString() : "",
          capacity: draft.capacity ? draft.capacity.toString() : "",
          minParticipants: draft.min_participants || 1,
          maxParticipants: draft.max_participants || 10,
          images: draft.images || [],
          scheduleType: draft.schedule_type || "oneTime",
          startDate: draft.start_date || "",
          endDate: draft.end_date || "",
          startTime: draft.start_time || "",
          endTime: draft.end_time || "",
          recurringDays: draft.recurring_days || [],
          whatToBring: draft.what_to_bring || [],
          learningOutcomes: draft.learning_outcomes || [],
        });
        
        // Load sessions if available
        if (draft.sessions) {
          setSessions(draft.sessions);
        }
      }
    };

    fetchDraft();
  }, [form]);

  return { sessions, setSessions };
};
