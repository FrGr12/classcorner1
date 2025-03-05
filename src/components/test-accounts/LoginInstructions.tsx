
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const LoginInstructions = () => {
  return (
    <Alert className="mb-4">
      <CheckCircle className="h-4 w-4" />
      <AlertTitle>Login Instructions</AlertTitle>
      <AlertDescription>
        <ol className="list-decimal pl-5 mt-2 space-y-2">
          <li>These accounts use email/password authentication.</li>
          <li>Go to the <Link to="/auth" className="text-accent-purple font-medium">login page</Link> to sign in.</li>
          <li>Make sure to sign out of any existing account first.</li>
          <li>Use the <strong>Sign In</strong> tab (not Google).</li>
          <li>Enter the email and password <strong>exactly</strong> as shown below.</li>
          <li>The auto-fill button on the login page can also help.</li>
        </ol>
      </AlertDescription>
    </Alert>
  );
};

export default LoginInstructions;
