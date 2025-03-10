
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the return URL from session storage or default to dashboard
        const returnTo = sessionStorage.getItem('returnTo') || '/';
        sessionStorage.removeItem('returnTo'); // Clean up
        
        console.log("Processing auth callback, will redirect to:", returnTo);
        console.log("Current URL:", window.location.href);
        
        // Check URL for error parameters
        const url = new URL(window.location.href);
        const errorParam = url.searchParams.get('error');
        const errorDescription = url.searchParams.get('error_description');
        
        if (errorParam) {
          throw new Error(errorDescription || errorParam);
        }
        
        // Process the auth callback
        const { data, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (data.session) {
          // Get user details for debugging
          const { data: userData, error: userError } = await supabase.auth.getUser();
          
          if (userError) {
            console.warn("Could get user data, but session exists:", userError);
          } else {
            setDebugInfo(JSON.stringify(userData, null, 2));
            console.log("User data:", userData);
          }
          
          // Successfully authenticated
          console.log("Authentication successful, session:", data.session);
          toast.success("Authentication successful");
          navigate(returnTo);
        } else {
          // No session found - check if we have a hash to parse
          const hashParams = url.hash.substring(1);
          
          if (hashParams) {
            console.log("Found hash parameters, attempting to exchange for session");
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
            
            if (sessionError) throw sessionError;
            
            if (sessionData.session) {
              toast.success("Authentication successful via hash params");
              navigate(returnTo);
              return;
            }
          }
          
          // No session found
          console.log("No session found, redirecting to auth");
          navigate('/auth');
        }
      } catch (err: any) {
        console.error('Auth error:', err);
        setError(err.message);
        toast.error(err.message || "Authentication failed");
        navigate('/auth', { state: { error: err.message } });
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
        {debugInfo && (
          <div className="mt-4 p-4 bg-gray-100 text-xs text-left overflow-auto max-h-64 rounded-md">
            <pre>{debugInfo}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;
