
import { ReactNode, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AuthGuardProps {
  children: ReactNode;
  allowBypass?: boolean; // Prop to allow bypassing auth
}

const AuthGuard = ({ children, allowBypass = false }: AuthGuardProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we're in admin mode - allows direct dashboard access
  const isAdminMode = localStorage.getItem("admin_mode") === "true";
  
  // In preview mode, we always want to bypass auth
  const isPreviewMode = window.location.hostname.includes('stackblitz') || 
                         window.location.hostname.includes('codesandbox') ||
                         window.location.hostname.includes('vercel.app') ||
                         window.location.hostname.includes('netlify.app');
  
  // IMMEDIATE RETURN FOR PREVIEW MODE
  // If we're in a preview environment, immediately render children without any auth checks
  if (isPreviewMode) {
    console.log("Preview mode detected - bypassing auth completely");
    // Make sure admin mode is enabled in preview environments
    if (localStorage.getItem("admin_mode") !== "true") {
      localStorage.setItem("admin_mode", "true");
    }
    return <>{children}</>;
  }

  // If in admin mode with allowBypass, skip auth entirely
  if (allowBypass && isAdminMode) {
    console.log("Admin mode enabled with allowBypass - skipping auth check");
    return <>{children}</>;
  }

  useEffect(() => {
    // If we're in preview mode or admin mode with allowBypass, skip auth check completely
    if ((isPreviewMode || (allowBypass && isAdminMode))) {
      console.log("Preview/Admin mode enabled, bypassing auth check completely");
      setIsAuthenticated(true);
      return;
    }

    const checkAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        
        if (error) {
          console.error("Authentication error:", error);
          throw error;
        }
        
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

    // Only run auth check if we're not bypassing
    if (!(isPreviewMode || (allowBypass && isAdminMode))) {
      checkAuth();
    }
    
    // Listen for auth state changes - only if not in admin/preview mode
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
        if (!location.pathname.includes('/auth') && !(isPreviewMode || (allowBypass && isAdminMode))) {
          navigate('/auth', { state: { returnTo: location.pathname } });
        }
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [navigate, location, allowBypass, isAdminMode, isPreviewMode]);

  // Show loading state while checking authentication, but only if we're not in bypass mode
  if (isAuthenticated === null && !(isPreviewMode || (allowBypass && isAdminMode))) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-accent-purple border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // If authenticated or bypass is allowed, render children
  return (isAuthenticated || isPreviewMode || (allowBypass && isAdminMode)) ? <>{children}</> : null;
};

export default AuthGuard;
