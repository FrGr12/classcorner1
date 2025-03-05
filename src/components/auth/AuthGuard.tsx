
import { ReactNode, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useDemoMode } from "@/contexts/DemoModeContext";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isDemoMode } = useDemoMode();

  useEffect(() => {
    console.log("AuthGuard - Demo mode status:", isDemoMode);
    
    // If demo mode is active, allow access to protected routes immediately
    if (isDemoMode) {
      console.log("Demo mode active, bypassing authentication check");
      setIsAuthenticated(true);
      return;
    }

    const checkAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        
        if (error) throw error;
        
        if (data?.user) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          // Save the current location to redirect back after login
          navigate('/auth', { state: { returnTo: location.pathname } });
          toast.error("Please sign in to access this page");
        }
      } catch (error: any) {
        console.error("Authentication error:", error);
        setIsAuthenticated(false);
        navigate('/auth', { state: { returnTo: location.pathname } });
      }
    };

    checkAuth();
    
    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setIsAuthenticated(true);
      } else if (event === 'SIGNED_OUT' && !isDemoMode) {
        setIsAuthenticated(false);
        navigate('/auth', { state: { returnTo: location.pathname } });
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [navigate, location.pathname, isDemoMode]);

  // Show loading state while checking authentication
  if (isAuthenticated === null && !isDemoMode) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-accent-purple border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // If in demo mode or authenticated, render children
  return (isDemoMode || isAuthenticated) ? <>{children}</> : null;
};

export default AuthGuard;
