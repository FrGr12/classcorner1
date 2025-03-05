
import { ReactNode, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AuthGuardProps {
  children: ReactNode;
  allowBypass?: boolean; // New prop to allow bypassing auth
}

const AuthGuard = ({ children, allowBypass = false }: AuthGuardProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we're in demo/admin mode - allows direct dashboard access
  const isDemoMode = localStorage.getItem("admin_mode") === "true";

  useEffect(() => {
    // If bypass is allowed and we're in demo mode, skip auth check
    if (allowBypass && isDemoMode) {
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
          
          // Don't redirect if we're already on the auth page
          if (!location.pathname.includes('/auth')) {
            // Store the current location to redirect back after login
            navigate('/auth', { state: { returnTo: location.pathname } });
            toast.error("Please sign in to access this page");
          }
        }
      } catch (error: any) {
        console.error("Authentication error:", error);
        setIsAuthenticated(false);
        
        // Don't redirect if we're already on the auth page
        if (!location.pathname.includes('/auth')) {
          navigate('/auth', { state: { returnTo: location.pathname } });
        }
      }
    };

    checkAuth();
    
    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session);
      if (event === 'SIGNED_IN' && session) {
        setIsAuthenticated(true);
        
        // Check if we have a returnTo path
        const state = location.state as { returnTo?: string };
        if (state?.returnTo) {
          navigate(state.returnTo);
        }
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        
        // Don't redirect if we're already on the auth page or if bypass is allowed
        if (!location.pathname.includes('/auth') && !(allowBypass && isDemoMode)) {
          navigate('/auth', { state: { returnTo: location.pathname } });
        }
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [navigate, location, allowBypass, isDemoMode]);

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-accent-purple border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // If authenticated or bypass is allowed, render children
  return (isAuthenticated || (allowBypass && isDemoMode)) ? <>{children}</> : null;
};

export default AuthGuard;
