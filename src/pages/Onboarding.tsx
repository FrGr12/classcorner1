
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useOnboardingForm } from "@/hooks/useOnboardingForm";
import { OnboardingForm } from "@/components/onboarding/OnboardingForm";

const Onboarding = () => {
  const { loading, submitting, formData, setFormData, handleSubmit } = useOnboardingForm();

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Complete Your Profile</CardTitle>
          <CardDescription>
            Tell us about yourself to get personalized class recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OnboardingForm 
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            submitting={submitting}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
