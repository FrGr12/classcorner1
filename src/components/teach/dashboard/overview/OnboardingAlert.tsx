
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

interface OnboardingAlertProps {
  steps: {
    profileComplete: boolean;
    firstClassCreated: boolean;
  };
}

const OnboardingAlert: FC<OnboardingAlertProps> = ({ steps }) => {
  const navigate = useNavigate();

  if (steps.profileComplete && steps.firstClassCreated) {
    return null;
  }

  return (
    <Alert variant="default" className="bg-blue-50 border-blue-200">
      <AlertCircle className="h-4 w-4 text-blue-500" />
      <AlertTitle className="text-blue-700">Complete Your Teaching Profile</AlertTitle>
      <AlertDescription className="text-blue-600">
        <div className="mt-2 space-y-3">
          {!steps.profileComplete && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-blue-100">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Step 1
              </Badge>
              <span>Complete your profile</span>
              <Button variant="link" onClick={() => navigate("/dashboard/profile")} className="text-blue-600">
                Update Profile <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
          {!steps.firstClassCreated && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-blue-100">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Step 2
              </Badge>
              <span>Create your first class</span>
              <Button variant="link" onClick={() => navigate("/dashboard/classes")} className="text-blue-600">
                Create Class <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default OnboardingAlert;
