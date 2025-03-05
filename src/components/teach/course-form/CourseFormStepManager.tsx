
import { useCourseForm } from "./CourseFormContext";
import BasicInfoSection from "./sections/BasicInfoSection";
import LocationCategorySection from "./sections/LocationCategorySection";
import LocationCategoryDetailsSection from "./sections/LocationCategoryDetailsSection";
import PricingCapacitySection from "./sections/PricingCapacitySection";
import ImagesSection from "./sections/ImagesSection";
import ScheduleSection from "./sections/ScheduleSection";
import BringItemsSection from "./sections/BringItemsSection";
import LearningOutcomesSection from "./sections/LearningOutcomesSection";
import SessionsWrapper from "./sections/SessionsWrapper";

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
          <SessionsWrapper sessions={sessions} setSessions={setSessions} />
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
