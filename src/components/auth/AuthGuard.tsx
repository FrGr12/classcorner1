
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // For development: bypass auth check and create a mock session
      const isDev = process.env.NODE_ENV === 'development';
      if (isDev) {
        // Skip auth check in development
        setIsLoading(false);
        return;
      }

      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Auth error:", error);
        toast.error("Authentication error");
        navigate("/auth", { replace: true });
        return;
      }

      if (!session) {
        toast.error("Please log in to continue");
        navigate("/auth", {
          replace: true,
          state: { returnUrl: window.location.pathname }
        });
      }
      setIsLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!isDevelopment && (event === 'SIGNED_OUT' || !session)) {
        navigate("/auth", { replace: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

const isDevelopment = process.env.NODE_ENV === 'development';

export default AuthGuard;
