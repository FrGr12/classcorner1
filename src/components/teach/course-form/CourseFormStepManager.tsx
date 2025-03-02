
import { useCourseForm } from "./CourseFormContext";
import BasicInfoSection from "./BasicInfoSection";
import LocationCategorySection from "./LocationCategorySection";
import LocationCategoryDetailsSection from "./LocationCategoryDetailsSection";
import PricingCapacitySection from "./PricingCapacitySection";
import ImagesSection from "./ImagesSection";
import ScheduleSection from "./ScheduleSection";
import BringItemsSection from "./BringItemsSection";
import LearningOutcomesSection from "./LearningOutcomesSection";
import { SessionsForm } from "@/components/teach/SessionsForm";

interface CourseFormStepManagerProps {
  currentStep: number;
}

export const CourseFormStepManager = ({ currentStep }: CourseFormStepManagerProps) => {
  const { form, sessions, setSessions } = useCourseForm();
  
  switch (currentStep) {
    case 0:
      return <BasicInfoSection form={form} />;
    case 1:
      return <LocationCategorySection form={form} />;
    case 2:
      return <LocationCategoryDetailsSection form={form} />;
    case 3:
      return <PricingCapacitySection form={form} />;
    case 4:
      return (
        <ImagesSection
          images={form.watch("images")}
          setImages={(images) => form.setValue("images", images)}
        />
      );
    case 5:
      return (
        <div className="space-y-6">
          <ScheduleSection form={form} />
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium mb-4">Class Sessions</h3>
            <SessionsForm 
              sessions={sessions} 
              setSessions={setSessions} 
            />
          </div>
        </div>
      );
    case 6:
      return <BringItemsSection form={form} />;
    case 7:
      return <LearningOutcomesSection form={form} />;
    default:
      return null;
  }
};
