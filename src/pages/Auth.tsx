
import { useEffect, useState } from "react";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AuthError } from "@supabase/supabase-js";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [session, setSession] = useState<any>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [lastAttemptedEmail, setLastAttemptedEmail] = useState<string | null>(null);
  
  // Get return path from state (if available)
  const returnTo = location.state?.returnTo || "/";

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Auth: Initial session check:", session);
      setSession(session);
      
      // If user is already logged in, redirect them
      if (session) {
        navigate(returnTo);
      }
    });

    // Set up auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session);
      setSession(session);
      
      if (event === 'SIGNED_IN' && session) {
        toast.success("Login successful");
        navigate(returnTo);
      } else if (event === 'SIGNED_OUT') {
        setSession(null);
      } else if (event === 'USER_UPDATED') {
        setSession(session);
      } else if (event === 'PASSWORD_RECOVERY') {
        // Handle password recovery flow
        navigate('/password-reset');
      } else if (event === 'TOKEN_REFRESHED') {
        setSession(session);
      } else if (event === 'ERROR') {
        console.error("Auth error occurred");
        setAuthError("An authentication error occurred");
      }
    });

    // Listen for auth errors from URL params
    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');
    const errorDescription = params.get('error_description');
    
    if (error) {
      setAuthError(errorDescription || error);
      toast.error(errorDescription || error);
    }

    return () => subscription.unsubscribe();
  }, [navigate, returnTo]);

  // Manual login handler for debugging
  const handleManualLogin = async () => {
    try {
      const email = prompt('Enter your email');
      const password = prompt('Enter your password');
      
      if (!email || !password) return;
      
      setLastAttemptedEmail(email);
      console.log("Manual login attempt for:", email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error("Manual login error:", error);
        handleAuthError(error, email);
      } else {
        console.log("Manual login success:", data);
        toast.success("Login successful");
      }
    } catch (error: any) {
      console.error("Unexpected error:", error);
      setAuthError(error.message);
      toast.error(error.message);
    }
  };

  // Try magic link login for debugging
  const handleMagicLinkLogin = async () => {
    try {
      const email = prompt('Enter your email for magic link');
      if (!email) return;
      
      setLastAttemptedEmail(email);
      console.log("Sending magic link to:", email);
      
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) {
        console.error("Magic link error:", error);
        handleAuthError(error, email);
      } else {
        console.log("Magic link sent:", data);
        toast.success("Magic link sent! Check your email");
      }
    } catch (error: any) {
      console.error("Unexpected error:", error);
      setAuthError(error.message);
      toast.error(error.message);
    }
  };

  // Handle specific auth errors with more helpful messages
  const handleAuthError = (error: AuthError, email?: string) => {
    console.error("Auth error details:", error);
    
    // Check if user exists but incorrect password
    if (error.message.includes("Invalid login credentials")) {
      // Try to get more details about the user
      checkUserExists(email || lastAttemptedEmail);
    }
    
    setAuthError(error.message);
    toast.error(error.message);
  };

  // Helper to check if user exists
  const checkUserExists = async (email: string | null) => {
    if (!email) return;
    
    try {
      // Try password reset as a way to verify if email exists
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/password-reset`,
      });
      
      if (error) {
        console.error("Email check error:", error);
        if (error.message.includes("Email not found")) {
          setAuthError("Account doesn't exist with this email. Please sign up first.");
          toast.error("Account doesn't exist with this email");
        }
      } else {
        console.log("User exists, password reset email sent");
        toast.info("Password reset email sent. Please check your inbox.");
      }
    } catch (error) {
      console.error("User check error:", error);
    }
  };

  // Console log current window URL for debugging
  useEffect(() => {
    console.log("Current URL:", window.location.href);
    console.log("Redirect URL will be:", `${window.location.origin}/auth/callback`);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold">Welcome Back</h1>
          <p className="text-neutral-600 mt-2">Sign in to continue to ClassCorner</p>
          {authError && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
              {authError}
            </div>
          )}
        </div>

        <SupabaseAuth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#9b87f5',
                  brandAccent: '#8b74f5'
                }
              }
            }
          }}
          redirectTo={`${window.location.origin}/auth/callback`}
        />

        <div className="mt-6 text-center space-y-2">
          <Button
            variant="link"
            className="text-sm text-neutral-600"
            onClick={() => navigate("/password-reset")}
          >
            Forgot your password?
          </Button>
          
          <div className="pt-2 flex justify-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleManualLogin}
              className="text-xs"
            >
              Debug Login
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleMagicLinkLogin}
              className="text-xs"
            >
              Debug Magic Link
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
