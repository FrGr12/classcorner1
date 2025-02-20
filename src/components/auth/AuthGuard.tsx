
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // For testing purposes only - you should implement proper admin verification
    const isAdminUser = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(isAdminUser);

    const checkAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Auth error:", error);
        toast.error("Authentication error");
        navigate("/auth", { replace: true });
        return;
      }

      // Allow access if user is admin or has valid session
      if (!session && !isAdminUser) {
        toast.error("Please log in to continue");
        navigate("/auth", {
          replace: true,
          state: { returnUrl: window.location.pathname }
        });
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' && !isAdminUser) {
        navigate("/auth", { replace: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  // For testing - you can toggle admin status in browser console with:
  // localStorage.setItem('isAdmin', 'true') or localStorage.setItem('isAdmin', 'false')
  if (isAdmin) {
    return <>{children}</>;
  }

  return <>{children}</>;
};

export default AuthGuard;
