
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { FormWrapper } from "./FormWrapper";
import BasicInfoSection from "./BasicInfoSection";
import LocationCategorySection from "./LocationCategorySection";
import LocationCategoryDetailsSection from "./LocationCategoryDetailsSection";
import PricingCapacitySection from "./PricingCapacitySection";
import ImagesSection from "./ImagesSection";
import ScheduleSection from "./ScheduleSection";
import BringItemsSection from "./BringItemsSection";
import LearningOutcomesSection from "./LearningOutcomesSection";
import { Button } from "@/components/ui/button";
import { ProgressIndicator } from "@/components/ui/progress-indicator";
import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { SessionsForm } from "@/components/teach/SessionsForm";
import { FormActions } from "./FormActions";
import { CourseFormStepManager } from "./CourseFormStepManager";
import { CourseFormProvider } from "./CourseFormContext";

interface CreateClassFormProps {
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
  draftCount: number;
}

const formSteps = [
  { id: "basic-info", label: "Basic Info" },
  { id: "location-category", label: "Location & Category" },
  { id: "details", label: "Details" },
  { id: "pricing", label: "Pricing & Capacity" },
  { id: "images", label: "Images" },
  { id: "schedule", label: "Schedule" },
  { id: "bring-items", label: "Items to Bring" },
  { id: "learning", label: "Learning Outcomes" },
];

const CreateClassForm = ({
  isSubmitting,
  setIsSubmitting,
  draftCount,
}: CreateClassFormProps) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [sessions, setSessions] = useState<any[]>([]);
  
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      location: "",
      locationType: "inPerson",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      onlineLink: "",
      classDetails: "",
      difficultyLevel: "beginner",
      price: "",
      capacity: "",
      images: [] as File[],
      scheduleType: "oneTime",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      recurringDays: [] as string[],
      whatToBring: [] as string[],
      learningOutcomes: [] as string[],
    }
  });

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

  const handleNext = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <CourseFormProvider form={form} sessions={sessions} setSessions={setSessions}>
      <FormWrapper>
        <Card className="p-6 mb-8">
          <ProgressIndicator 
            steps={formSteps} 
            currentStep={currentStep} 
            className="mb-8" 
          />
          
          <CourseFormStepManager 
            currentStep={currentStep} 
          />
          
          <FormActions 
            currentStep={currentStep}
            totalSteps={formSteps.length}
            isSubmitting={isSubmitting}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSaveDraft={() => handleSaveDraft(form, sessions, setIsSubmitting)}
            onSubmit={() => handleSubmit(form, sessions, setIsSubmitting, navigate)}
          />
        </Card>
      </FormWrapper>
    </CourseFormProvider>
  );
};

// Helper functions extracted to improve readability
const handleSaveDraft = async (form: any, sessions: any[], setIsSubmitting: (state: boolean) => void) => {
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
    toast.error(error.message);
  } finally {
    setIsSubmitting(false);
  }
};

const handleSubmit = async (
  form: any, 
  sessions: any[], 
  setIsSubmitting: (state: boolean) => void,
  navigate: any
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
    toast.error(error.message);
  } finally {
    setIsSubmitting(false);
  }
};

export default CreateClassForm;
