
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface TestAccount {
  email: string;
  password: string;
  status: string;
  userId?: string;
  message?: string;
}

export const useTestAccounts = () => {
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState<TestAccount[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loginTested, setLoginTested] = useState(false);
  const [processingTestLogin, setProcessingTestLogin] = useState(false);

  const createTestAccounts = async () => {
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

  return {
    loading,
    accounts,
    error,
    loginTested,
    processingTestLogin,
    createTestAccounts,
    testLogin,
    copyToClipboard
  };
};
