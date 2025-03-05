
import { ReactNode, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        
        if (error) throw error;
        
        if (data?.user) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          // Store the current location to redirect back after login
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
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        navigate('/auth', { state: { returnTo: location.pathname } });
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-accent-purple border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // If authenticated, render children
  return isAuthenticated ? <>{children}</> : null;
};

export default AuthGuard;
