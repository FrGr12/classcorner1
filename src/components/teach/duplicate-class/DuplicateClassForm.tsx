
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { DuplicateClassFormData } from "@/types/duplicate-class";
import BasicInfoSection from "@/components/teach/course-form/BasicInfoSection";
import LocationCategorySection from "@/components/teach/course-form/LocationCategorySection";
import PricingCapacitySection from "@/components/teach/course-form/PricingCapacitySection";
import BringItemsSection from "@/components/teach/course-form/BringItemsSection";
import LearningOutcomesSection from "@/components/teach/course-form/LearningOutcomesSection";
import ImagesSection from "@/components/teach/course-form/ImagesSection";
import LocationCategoryDetailsSection from "@/components/teach/course-form/LocationCategoryDetailsSection";
import CreateClassActions from "@/components/teach/create-class/CreateClassActions";

interface DuplicateClassFormProps {
  form: UseFormReturn<DuplicateClassFormData>;
  onSubmit: (data: DuplicateClassFormData) => Promise<void>;
  isSubmitting: boolean;
  onSaveDraft: () => Promise<void>;
  images: File[];
  setImages: (images: File[]) => void;
}

const DuplicateClassForm = ({
  form,
  onSubmit,
  isSubmitting,
  onSaveDraft,
  images,
  setImages,
}: DuplicateClassFormProps) => {
  return (
    <Form {...form}>
      <form id="create-class-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6 text-left">Basic Information</h2>
          <BasicInfoSection form={form} />
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6 text-left">What to Bring and Learning Outcomes</h2>
          <div className="space-y-6">
            <BringItemsSection form={form} />
            <LearningOutcomesSection form={form} />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6 text-left">Location & Category</h2>
          <LocationCategorySection form={form} />
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6 text-left">Pricing & Capacity</h2>
          <PricingCapacitySection form={form} />
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6 text-left">Add Images</h2>
          <ImagesSection images={images} setImages={setImages} />
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6 text-left">Add Sessions</h2>
          <p className="text-muted-foreground mb-6 text-left">Schedule individual sessions or set up recurring classes (weekly, bi-weekly, or monthly)</p>
          <LocationCategoryDetailsSection form={form} />
        </Card>

        <CreateClassActions
          isSubmitting={isSubmitting}
          onSaveDraft={onSaveDraft}
          isValid={form.formState.isValid}
        />
      </form>
    </Form>
  );
};

export default DuplicateClassForm;
