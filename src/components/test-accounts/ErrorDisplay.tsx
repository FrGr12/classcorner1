
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ErrorDisplayProps {
  error: string;
}

const ErrorDisplay = ({ error }: ErrorDisplayProps) => {
  if (!error) return null;
  
  const isDatabaseError = error.includes("Database") || error.includes("profiles table");
  
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        <p>{error}</p>
        
        {isDatabaseError ? (
          <div className="mt-2 p-3 bg-red-50 border border-red-100 rounded-md">
            <p className="text-xs font-medium">Database Setup Issue Detected:</p>
            <ol className="mt-1 text-xs list-decimal pl-4 space-y-1">
              <li>Make sure your Supabase project is properly initialized</li>
              <li>Check that the profiles table exists in your database</li>
              <li>Verify the RLS policies are correctly set up</li>
              <li>Ensure all required triggers and functions are created</li>
            </ol>
          </div>
        ) : (
          <p className="mt-2 text-xs">
            Make sure that the Supabase Edge Function is deployed and has the necessary environment 
            variables (SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY) configured.
          </p>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default ErrorDisplay;
