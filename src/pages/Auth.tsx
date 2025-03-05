
import { useEffect, useState } from "react";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [session, setSession] = useState<any>(null);
  
  // Get return path from state (if available)
  const returnTo = location.state?.returnTo || "/";

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      
      // If user is already logged in, redirect them
      if (session) {
        navigate(returnTo);
      }
    });

    // Set up auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", _event, session);
      setSession(session);
      
      // If user logs in, redirect them to the return path
      if (session) {
        toast.success("Login successful");
        navigate(returnTo);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, returnTo]);

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold">Welcome Back</h1>
          <p className="text-neutral-600 mt-2">Sign in to continue to ClassCorner</p>
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
          providers={["google"]}
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
        </div>
      </div>
    </div>
  );
};

export default Auth;
