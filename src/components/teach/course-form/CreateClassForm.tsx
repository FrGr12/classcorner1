import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { FormWrapper } from "./FormWrapper";
import { BasicInfoSection } from "./BasicInfoSection";
import { LocationCategorySection } from "./LocationCategorySection";
import { LocationCategoryDetailsSection } from "./LocationCategoryDetailsSection";
import { PricingCapacitySection } from "./PricingCapacitySection";
import { ImagesSection } from "./ImagesSection";
import { ScheduleSection } from "./ScheduleSection";
import { BringItemsSection } from "./BringItemsSection";
import { LearningOutcomesSection } from "./LearningOutcomesSection";
import { Button } from "@/components/ui/button";
import { ProgressIndicator } from "@/components/ui/progress-indicator";
import { Card } from "@/components/ui/card";

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
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
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
    images: [],
    scheduleType: "oneTime",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    recurringDays: [],
    itemsToBring: [],
    learningOutcomes: [],
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
        setFormData({
          title: draft.title || "",
          description: draft.description || "",
          category: draft.category || "",
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
          itemsToBring: draft.items_to_bring || [],
          learningOutcomes: draft.learning_outcomes || [],
        });
      }
    };

    fetchDraft();
  }, []);

  const handleSaveDraft = async () => {
    setIsSubmitting(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Not authenticated");

      const courseData = {
        instructor_id: userData.user.id,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        location_type: formData.locationType,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zipCode,
        online_link: formData.onlineLink,
        class_details: formData.classDetails,
        difficulty_level: formData.difficultyLevel,
        price: parseFloat(formData.price),
        capacity: parseInt(formData.capacity),
        images: formData.images,
        schedule_type: formData.scheduleType,
        start_date: formData.startDate,
        end_date: formData.endDate,
        start_time: formData.startTime,
        end_time: formData.endTime,
        recurring_days: formData.recurringDays,
        items_to_bring: formData.itemsToBring,
        learning_outcomes: formData.learningOutcomes,
        status: 'draft'
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Not authenticated");

      if (
        !formData.title ||
        !formData.description ||
        !formData.category ||
        !formData.classDetails ||
        !formData.price ||
        !formData.capacity ||
        !formData.images.length ||
        !formData.startDate ||
        !formData.startTime ||
        !formData.endTime ||
        (formData.scheduleType === 'recurring' && !formData.recurringDays.length)
      ) {
        toast.error("Please fill in all required fields.");
        return;
      }

      const courseData = {
        instructor_id: userData.user.id,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        location_type: formData.locationType,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zipCode,
        online_link: formData.onlineLink,
        class_details: formData.classDetails,
        difficulty_level: formData.difficultyLevel,
        price: parseFloat(formData.price),
        capacity: parseInt(formData.capacity),
        images: formData.images,
        schedule_type: formData.scheduleType,
        start_date: formData.startDate,
        end_date: formData.endDate,
        start_time: formData.startTime,
        end_time: formData.endTime,
        recurring_days: formData.recurringDays,
        items_to_bring: formData.itemsToBring,
        learning_outcomes: formData.learningOutcomes,
        status: 'published',
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

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <BasicInfoSection
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 1:
        return (
          <LocationCategorySection
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 2:
        return (
          <LocationCategoryDetailsSection
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 3:
        return (
          <PricingCapacitySection
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 4:
        return (
          <ImagesSection
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 5:
        return (
          <ScheduleSection
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 6:
        return (
          <BringItemsSection
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 7:
        return (
          <LearningOutcomesSection
            formData={formData}
            setFormData={setFormData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <FormWrapper>
      <Card className="p-6 mb-8">
        <ProgressIndicator 
          steps={formSteps} 
          currentStep={currentStep} 
          className="mb-8" 
        />
        
        {renderCurrentStep()}
        
        <div className="flex justify-between mt-8">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          
          <div className="space-x-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleSaveDraft}
              disabled={isSubmitting}
            >
              Save Draft
            </Button>
            
            {currentStep < formSteps.length - 1 ? (
              <Button 
                type="button" 
                onClick={handleNext}
              >
                Next
              </Button>
            ) : (
              <Button 
                type="button"
                onClick={handleSubmit}
                isLoading={isSubmitting}
                loadingText="Creating Class..."
              >
                Create Class
              </Button>
            )}
          </div>
        </div>
      </Card>
    </FormWrapper>
  );
};

export default CreateClassForm;
