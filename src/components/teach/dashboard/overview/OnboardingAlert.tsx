
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OnboardingSteps {
  preferences_completed: boolean;
  location_completed: boolean;
  interests_completed: boolean;
}

const OnboardingAlert: FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [steps, setSteps] = useState<OnboardingSteps>({
    preferences_completed: false,
    location_completed: false,
    interests_completed: false
  });

  useEffect(() => {
    fetchOnboardingSteps();
  }, []);

  const fetchOnboardingSteps = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase
        .from('onboarding_steps')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        // If no record exists, create one
        if (error.code === 'PGRST116') {
          const { error: insertError } = await supabase
            .from('onboarding_steps')
            .insert([{ user_id: user.id }]);
          
          if (insertError) throw insertError;
          
          setSteps({
            preferences_completed: false,
            location_completed: false,
            interests_completed: false
          });
        } else {
          throw error;
        }
      } else if (data) {
        setSteps({
          preferences_completed: data.preferences_completed || false,
          location_completed: data.location_completed || false,
          interests_completed: data.interests_completed || false
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load onboarding progress. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStepClick = async (step: keyof OnboardingSteps, path: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Update the step in the database first
      const { error } = await supabase
        .from('onboarding_steps')
        .update({ [step]: true })
        .eq('user_id', user.id);

      if (error) throw error;

      // Update local state
      setSteps(prev => ({
        ...prev,
        [step]: true
      }));

      // Show success toast
      toast({
        title: "Progress Saved",
        description: "Your preferences have been updated successfully."
      });

      // Navigate to the next step
      navigate(path);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update progress. Please try again."
      });
    }
  };

  if (loading) {
    return (
      <Alert variant="default" className="bg-blue-50 border-blue-200">
        <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
        <AlertTitle className="text-blue-700">Loading...</AlertTitle>
      </Alert>
    );
  }

  // If all steps are completed, don't show the alert
  if (steps.preferences_completed && steps.location_completed && steps.interests_completed) {
    return null;
  }

  return (
    <Alert variant="default" className="bg-blue-50 border-blue-200">
      <AlertCircle className="h-4 w-4 text-blue-500" />
      <AlertTitle className="text-blue-700">Complete Your Profile</AlertTitle>
      <AlertDescription className="text-blue-600">
        <div className="mt-2 space-y-3">
          {!steps.preferences_completed && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-blue-100">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Step 1
              </Badge>
              <span>Update your preferences</span>
              <Button 
                variant="link" 
                onClick={() => handleStepClick('preferences_completed', "/dashboard/preferences")} 
                className="text-blue-600"
              >
                Set Preferences <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
          {!steps.location_completed && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-blue-100">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Step 2
              </Badge>
              <span>Set your location</span>
              <Button 
                variant="link" 
                onClick={() => handleStepClick('location_completed', "/dashboard/location")} 
                className="text-blue-600"
              >
                Update Location <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
          {!steps.interests_completed && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-blue-100">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Step 3
              </Badge>
              <span>Choose your interests</span>
              <Button 
                variant="link" 
                onClick={() => handleStepClick('interests_completed', "/dashboard/interests")} 
                className="text-blue-600"
              >
                Select Interests <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default OnboardingAlert;
