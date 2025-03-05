
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface InvalidLinkErrorProps {
  errorDescription: string | null;
}

const InvalidLinkError = ({ errorDescription }: InvalidLinkErrorProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <Alert variant="destructive" className="bg-red-50 border-red-200">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle>Reset link is invalid or has expired</AlertTitle>
        <AlertDescription>
          {errorDescription || "Please request a new password reset link."}
        </AlertDescription>
      </Alert>
      <Button 
        onClick={() => navigate("/password-reset")} 
        className="w-full"
      >
        Request New Reset Link
      </Button>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => navigate("/auth")}
      >
        Back to Login
      </Button>
    </div>
  );
};

export default InvalidLinkError;
