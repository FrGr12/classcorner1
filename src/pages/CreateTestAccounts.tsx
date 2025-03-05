
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Loader2, Info, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const CreateTestAccounts = () => {
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loginTested, setLoginTested] = useState(false);
  const [processingTestLogin, setProcessingTestLogin] = useState(false);

  const handleCreateTestAccounts = async () => {
    setLoading(true);
    setError(null);
    setLoginTested(false);
    
    try {
      console.log("Invoking create-test-accounts function");
      
      // Attempt to invoke the edge function
      const { data, error } = await supabase.functions.invoke('create-test-accounts');
      
      console.log("Function response:", { data, error });
      
      if (error) {
        console.error("Edge function error:", error);
        throw new Error(`Edge function error: ${error.message}`);
      }
      
      if (!data) {
        throw new Error("No data returned from edge function");
      }
      
      if (data?.accounts) {
        setAccounts(data.accounts);
        toast.success('Test accounts processed successfully!');
      } else {
        throw new Error("Unexpected response format from edge function");
      }
    } catch (error: any) {
      console.error('Error creating test accounts:', error);
      setError(error.message || "Unknown error occurred");
      toast.error(`Error creating test accounts: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testLogin = async (email: string, password: string) => {
    try {
      setProcessingTestLogin(true);
      console.log(`Testing login for ${email}`);
      
      // First sign out if already signed in
      await supabase.auth.signOut();
      
      // Now attempt to sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      console.log("Login test response:", { data, error });
      
      if (error) {
        throw error;
      }
      
      toast.success(`Successfully logged in as ${email}!`);
      setLoginTested(true);
      
      // Sign out after successful login test
      await supabase.auth.signOut();
      
    } catch (error: any) {
      console.error('Login test failed:', error);
      toast.error(`Login test failed: ${error.message}`);
    } finally {
      setProcessingTestLogin(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

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
              onClick={handleCreateTestAccounts} 
              disabled={loading}
              className="w-full max-w-xs"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : "Create Test Accounts"}
            </Button>
          </div>
          
          {error && (
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
          )}
          
          {accounts.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Test Account Credentials:</h3>
              
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
              
              <div className="space-y-4">
                {accounts.map((account, index) => (
                  <div key={index} className={`p-4 border rounded-md ${account.status === 'error' ? 'bg-red-50 border-red-100' : 'bg-slate-50'}`}>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <p><strong>Email:</strong> {account.email}</p>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => copyToClipboard(account.email)}
                            className="h-6 px-2"
                          >
                            Copy
                          </Button>
                        </div>
                        
                        {account.password && (
                          <div className="flex items-center gap-2">
                            <p><strong>Password:</strong> {account.password}</p>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => copyToClipboard(account.password)}
                              className="h-6 px-2"
                            >
                              Copy
                            </Button>
                          </div>
                        )}
                        
                        <p className="flex items-center gap-1">
                          <strong>Status:</strong> 
                          <span className={account.status === 'error' ? 'text-red-600' : 
                                          account.status === 'warning' ? 'text-amber-600' : 
                                          'text-green-600'}>
                            {account.status}
                          </span>
                        </p>
                        {account.userId && <p><strong>User ID:</strong> {account.userId}</p>}
                        {account.message && <p className="text-red-600"><strong>Message:</strong> {account.message}</p>}
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={() => testLogin(account.email, account.password)}
                        className="shrink-0"
                        disabled={processingTestLogin}
                      >
                        {processingTestLogin ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Testing...
                          </>
                        ) : "Test Login"}
                      </Button>
                    </div>
                  </div>
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
              
              <div className="mt-4 p-4 border rounded-md bg-amber-50">
                <p className="text-sm text-amber-800 font-medium mb-2">
                  Troubleshooting Login Issues:
                </p>
                <ol className="list-decimal pl-5 text-sm text-amber-800 space-y-2">
                  <li>First, try recreating the test accounts using the button above</li>
                  <li>If the "Test Login" button works but you still can't log in on the auth page:
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Clear your browser cache and cookies</li>
                      <li>Try in an incognito/private browsing window</li>
                      <li>Make sure you're using the exact same email and password (use copy buttons)</li>
                    </ul>
                  </li>
                  <li>Check the Supabase dashboard to ensure:
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>The user appears in the Authentication {'>'} Users section</li>
                      <li>Email confirmation is disabled in Authentication {'>'} Settings</li>
                      <li>The site URL and redirect URLs are configured correctly</li>
                    </ul>
                  </li>
                  <li>If issues persist, check browser console logs for specific error messages</li>
                </ol>
              </div>
              
              <div className="mt-4 text-center">
                <Button variant="outline" asChild>
                  <Link to="/auth">Go to Login Page</Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTestAccounts;
