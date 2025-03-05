
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the return URL from session storage or default to dashboard
        const returnTo = sessionStorage.getItem('returnTo') || '/';
        sessionStorage.removeItem('returnTo'); // Clean up
        
        console.log("Processing auth callback, will redirect to:", returnTo);
        console.log("Current URL:", window.location.href);
        
        // Process the auth callback
        const { data, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (data.session) {
          // Successfully authenticated
          console.log("Authentication successful, session:", data.session);
          toast.success("Authentication successful");
          navigate(returnTo);
        } else {
          // No session found
          console.log("No session found, redirecting to auth");
          navigate('/auth');
        }
      } catch (err: any) {
        console.error('Auth error:', err);
        setError(err.message);
        toast.error(err.message || "Authentication failed");
        navigate('/auth');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-sm p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Authentication Error</h2>
          <p className="text-neutral-600">{error}</p>
          <button 
            onClick={() => navigate('/auth')}
            className="mt-4 text-accent-purple hover:underline"
          >
            Return to login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <div className="animate-spin inline-block h-8 w-8 border-4 border-current border-t-transparent rounded-full text-accent-purple"></div>
        <p className="mt-4 text-neutral-600">Completing authentication...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
