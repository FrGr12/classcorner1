
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

  // Check if we have any successful accounts
  const hasSuccessfulAccount = accounts.some(account => account.status === 'created');
  
  // Check if we have database errors
  const hasDatabaseError = accounts.some(account => 
    account.message?.includes('Database') || 
    account.message?.includes('profiles')
  );

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4">Test Account Credentials:</h3>
      
      <SetupInstructions />
      
      {hasSuccessfulAccount && <LoginInstructions />}
      
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
      
      {hasDatabaseError ? (
        <div className="mt-4 p-4 border rounded-md bg-red-50 border-red-100">
          <h4 className="font-medium text-red-800">Database Setup Issue Detected</h4>
          <p className="mt-1 text-sm text-red-700">
            The error messages indicate a database setup issue. You need to make sure:
          </p>
          <ol className="list-decimal pl-5 mt-2 text-sm text-red-700 space-y-1">
            <li>Your Supabase project has a <code className="bg-red-100 px-1 rounded">profiles</code> table</li>
            <li>There is a function and trigger that creates a profile when a user signs up</li>
            <li>All required database triggers and RLS policies are in place</li>
          </ol>
        </div>
      ) : (
        <TroubleshootingGuide />
      )}
      
      <div className="mt-4 text-center">
        <Button variant="outline" asChild>
          <Link to="/auth">Go to Login Page</Link>
        </Button>
      </div>
    </div>
  );
};

export default AccountsDisplay;
