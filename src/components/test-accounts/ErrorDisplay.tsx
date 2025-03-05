
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ErrorDisplayProps {
  error: string;
}

const ErrorDisplay = ({ error }: ErrorDisplayProps) => {
  if (!error) return null;
  
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        <p>{error}</p>
        <p className="mt-2 text-xs">
          Make sure that the Supabase Edge Function is deployed and has the necessary environment 
          variables (SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY) configured.
        </p>
      </AlertDescription>
    </Alert>
  );
};

export default ErrorDisplay;
