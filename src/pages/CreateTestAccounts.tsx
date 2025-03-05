
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Database, AlertCircle } from "lucide-react";
import ErrorDisplay from "@/components/test-accounts/ErrorDisplay";
import AccountsDisplay from "@/components/test-accounts/AccountsDisplay";
import TroubleshootingGuide from "@/components/test-accounts/TroubleshootingGuide";
import { useTestAccounts } from "@/hooks/useTestAccounts";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CreateTestAccounts = () => {
  const {
    loading,
    accounts,
    error,
    loginTested,
    processingTestLogin,
    createTestAccounts,
    testLogin,
    copyToClipboard
  } = useTestAccounts();

  // Check if there are database setup issues
  const hasDatabaseSetupIssues = error?.includes('Database') || 
    error?.includes('profiles table') || 
    accounts.some(account => 
      account.message?.includes('Database') || 
      account.message?.includes('profiles table')
    );

  return (
    <div className="container py-10 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create Test Accounts</CardTitle>
          <CardDescription>
            Create demo student and teacher accounts for testing purposes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {hasDatabaseSetupIssues && (
            <Alert variant="destructive" className="bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription>
                <div className="flex items-center gap-2 text-red-800 font-medium">
                  <Database className="h-4 w-4" />
                  <span>Database Setup Required</span>
                </div>
                <p className="mt-1 text-sm text-red-700">
                  Your Supabase project is missing the required database configuration. 
                  Please follow the troubleshooting guide below to set up your database.
                </p>
              </AlertDescription>
            </Alert>
          )}
          
          <div className="flex justify-center">
            <Button 
              onClick={createTestAccounts} 
              disabled={loading}
              className="w-full max-w-xs"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : accounts.length > 0 ? "Recreate Test Accounts" : "Create Test Accounts"}
            </Button>
          </div>
          
          {error && <ErrorDisplay error={error} />}
          
          {accounts.length > 0 && (
            <AccountsDisplay
              accounts={accounts}
              loginTested={loginTested}
              processingTestLogin={processingTestLogin}
              onTestLogin={testLogin}
              onCopy={copyToClipboard}
            />
          )}
          
          {hasDatabaseSetupIssues && <TroubleshootingGuide />}
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTestAccounts;
