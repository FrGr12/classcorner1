
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Database, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorDisplayProps {
  error: string;
}

const ErrorDisplay = ({ error }: ErrorDisplayProps) => {
  if (!error) return null;
  
  const isDatabaseError = error.includes("Database") || 
    error.includes("profiles table") || 
    error.includes("relation") ||
    error.includes("handle_new_user");
  
  const getErrorMessage = () => {
    if (error.includes("profiles table does not exist")) {
      return "The required 'profiles' table is missing in your database.";
    } else if (error.includes("function handle_new_user() does not exist")) {
      return "The 'handle_new_user' function is missing in your database.";
    } else if (error.includes("Missing environment variables")) {
      return "Edge function environment variables are not properly configured.";
    } else {
      return error;
    }
  };
  
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        <p>{getErrorMessage()}</p>
        
        {isDatabaseError ? (
          <div className="mt-2 p-3 bg-red-50 border border-red-100 rounded-md">
            <p className="text-xs font-medium flex items-center">
              <Database className="h-3 w-3 mr-1" />
              Database Setup Issue Detected:
            </p>
            <ol className="mt-1 text-xs list-decimal pl-4 space-y-1">
              <li>Your Supabase project is missing the required database configuration</li>
              <li>The <code className="bg-red-100 px-1 rounded">profiles</code> table must exist in your database</li>
              <li>The <code className="bg-red-100 px-1 rounded">handle_new_user</code> function must be created</li>
              <li>A trigger must be set up to call the function when users are created</li>
              <li>See the detailed troubleshooting guide above for SQL to fix this issue</li>
            </ol>
            
            <div className="mt-2">
              <Button 
                variant="ghost" 
                size="sm"
                className="h-7 text-xs"
                onClick={() => window.open('https://supabase.com/dashboard/project/pylbrdwuikhwupqjcqzy/sql/new', '_blank')}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Open SQL Editor
              </Button>
            </div>
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
