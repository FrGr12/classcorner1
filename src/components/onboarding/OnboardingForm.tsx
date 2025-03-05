
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { BasicInfoFields } from "./BasicInfoFields";
import { InterestsSelection } from "./InterestsSelection";
import { OnboardingFormData } from "@/hooks/useOnboardingForm";

interface OnboardingFormProps {
  formData: OnboardingFormData;
  setFormData: React.Dispatch<React.SetStateAction<OnboardingFormData>>;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  submitting: boolean;
}

export const OnboardingForm = ({ formData, setFormData, handleSubmit, submitting }: OnboardingFormProps) => {
  const handleInterestToggle = (category: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(category)
        ? prev.interests.filter(i => i !== category)
        : [...prev.interests, category]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <BasicInfoFields formData={formData} setFormData={setFormData} />
      
      {formData.userType === "student" && (
        <InterestsSelection 
          interests={formData.interests}
          onInterestToggle={handleInterestToggle}
        />
      )}

      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Complete Profile"
        )}
      </Button>
    </form>
  );
};
