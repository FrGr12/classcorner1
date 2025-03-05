
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CreateTestAccounts = () => {
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState<any[]>([]);

  const handleCreateTestAccounts = async () => {
    setLoading(true);
    try {
      // Add logging to debug the issue
      console.log("Invoking create-test-accounts function");
      
      const { data, error } = await supabase.functions.invoke('create-test-accounts');
      
      console.log("Function response:", { data, error });
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (data?.accounts) {
        setAccounts(data.accounts);
        toast.success('Test accounts created successfully!');
      }
    } catch (error: any) {
      console.error('Error creating test accounts:', error);
      toast.error(`Error creating test accounts: ${error.message}`);
    } finally {
      setLoading(false);
    }
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
              {loading ? "Creating..." : "Create Test Accounts"}
            </Button>
          </div>
          
          {accounts.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Test Account Credentials:</h3>
              <div className="space-y-4">
                {accounts.map((account, index) => (
                  <div key={index} className="p-4 border rounded-md bg-slate-50">
                    <p><strong>Email:</strong> {account.email}</p>
                    {account.password && <p><strong>Password:</strong> {account.password}</p>}
                    <p><strong>Status:</strong> {account.status}</p>
                    {account.message && <p><strong>Message:</strong> {account.message}</p>}
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 border rounded-md bg-amber-50">
                <p className="text-sm text-amber-800">
                  <strong>Note:</strong> These are test accounts for demo purposes. 
                  Anyone with these credentials will be able to log in, so don't use them 
                  for sensitive information.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTestAccounts;
