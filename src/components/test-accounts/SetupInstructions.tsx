
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

const SetupInstructions = () => {
  return (
    <Alert className="mb-4">
      <Info className="h-4 w-4" />
      <AlertTitle>Important Setup Instructions</AlertTitle>
      <AlertDescription>
        <div className="mt-2 space-y-2 text-sm">
          <p className="font-medium">For test accounts to work properly, you must:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Make sure Supabase has the correct URL configurations</li>
            <li>The site URL should be set to your development URL</li>
            <li>The redirect URL should include your development URL</li>
          </ol>
          <div className="p-2 bg-yellow-50 border border-yellow-100 rounded-md text-yellow-800 mt-2">
            <p>If you're still having issues after creating test accounts, please check the Supabase authentication settings.</p>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default SetupInstructions;
