
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { TestAccount } from "@/hooks/useTestAccounts";
import AccountItem from "./AccountItem";
import SetupInstructions from "./SetupInstructions";
import LoginInstructions from "./LoginInstructions";
import TroubleshootingGuide from "./TroubleshootingGuide";

interface AccountsDisplayProps {
  accounts: TestAccount[];
  loginTested: boolean;
  processingTestLogin: boolean;
  onTestLogin: (email: string, password: string) => Promise<void>;
  onCopy: (text: string) => void;
}

const AccountsDisplay = ({
  accounts,
  loginTested,
  processingTestLogin,
  onTestLogin,
  onCopy
}: AccountsDisplayProps) => {
  if (accounts.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4">Test Account Credentials:</h3>
      
      <SetupInstructions />
      <LoginInstructions />
      
      <div className="space-y-4">
        {accounts.map((account, index) => (
          <AccountItem 
            key={index}
            account={account}
            onTestLogin={onTestLogin}
            onCopy={onCopy}
            processingTestLogin={processingTestLogin}
          />
        ))}
      </div>
      
      {loginTested && (
        <Alert className="mt-4 bg-green-50 border-green-200 text-green-800">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle>Login Test Successful</AlertTitle>
          <AlertDescription>
            Login was successful. You can now use these credentials at the 
            <Link to="/auth" className="text-accent-purple font-medium ml-1">login page</Link>.
          </AlertDescription>
        </Alert>
      )}
      
      <TroubleshootingGuide />
      
      <div className="mt-4 text-center">
        <Button variant="outline" asChild>
          <Link to="/auth">Go to Login Page</Link>
        </Button>
      </div>
    </div>
  );
};

export default AccountsDisplay;
