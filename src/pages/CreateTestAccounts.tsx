
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import ErrorDisplay from "@/components/test-accounts/ErrorDisplay";
import AccountsDisplay from "@/components/test-accounts/AccountsDisplay";
import { useTestAccounts } from "@/hooks/useTestAccounts";

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
  const hasDatabaseSetupIssues = accounts.some(account => 
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
          
          {hasDatabaseSetupIssues && (
            <div className="p-4 mt-4 border rounded-md bg-blue-50 border-blue-100">
              <h4 className="font-medium text-blue-800">Database Setup Required</h4>
              <p className="mt-1 text-sm text-blue-700">
                It appears your Supabase project might be missing the required database setup. 
                This is common when starting a new project. You need to make sure your database 
                has the proper tables and functions configured.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTestAccounts;
