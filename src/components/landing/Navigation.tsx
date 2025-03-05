
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import IntegratedSearch from "./search/IntegratedSearch";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { MobileMenu } from "./navigation/MobileMenu";
import { DesktopMenu } from "./navigation/DesktopMenu";
import { UserType } from "@/types/user";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [userType, setUserType] = useState<UserType>('teacher');
  const isHomePage = location.pathname === "/";
  const isBrowsePage = location.pathname === "/browse";
  const isAdminMode = localStorage.getItem("admin_mode") === "true";

  useEffect(() => {
    if (!isAdminMode) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        
        // If we have a session, try to get the user type
        if (session?.user?.id) {
          getUserType(session.user.id);
        }
      });

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (_event, session) => {
        setSession(session);
        
        // Update user type when auth state changes
        if (session?.user?.id) {
          getUserType(session.user.id);
        }
      });

      return () => subscription.unsubscribe();
    } else {
      // In admin mode, set a mock session
      setSession({ user: { id: 'admin-user' } });
    }
  }, [isAdminMode]);

  const getUserType = async (userId: string) => {
    try {
      // This is a placeholder - in a real app, you would fetch the user type from your database
      // For example: const { data } = await supabase.from('profiles').select('user_type').eq('id', userId).single();
      // Here we're defaulting to 'teacher' since that's the main flow in your app
      setUserType('teacher');
    } catch (error) {
      console.error('Error fetching user type:', error);
    }
  };

  const handleAuthClick = () => {
    navigate("/auth");
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleDashboardClick = () => {
    // Redirect to the appropriate dashboard based on user type
    navigate(userType === 'student' ? '/user-dashboard' : '/dashboard');
  };

  const handleLogout = async () => {
    if (isAdminMode) {
      // In admin mode, just disable admin mode
      localStorage.removeItem("admin_mode");
      toast({
        title: "Admin mode disabled",
      });
      window.location.reload();
      return;
    }
    
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast({
        title: "Logged out successfully",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error logging out",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50">
      <div className="bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-lg px-4 py-2.5 flex flex-col md:flex-row items-center gap-4">
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-4 min-w-fit">
            {!isHomePage && (
              <Button
                variant="ghost"
                size="icon-sm"
                className="hover:text-accent-purple"
                onClick={handleBack}
                aria-label="Go back"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <Link to="/" className="flex items-center">
              <span className="text-base sm:text-xl font-display text-accent-purple">
                classcorner
              </span>
            </Link>
          </div>
          <MobileMenu
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            session={session || (isAdminMode ? { user: { id: 'admin-user' } } : null)}
            handleDashboardClick={handleDashboardClick}
            handleLogout={handleLogout}
            handleAuthClick={handleAuthClick}
            loading={loading}
            userType={userType}
          />
        </div>
        
        {!isBrowsePage && <IntegratedSearch />}

        <DesktopMenu
          session={session || (isAdminMode ? { user: { id: 'admin-user' } } : null)}
          handleDashboardClick={handleDashboardClick}
          handleLogout={handleLogout}
          handleAuthClick={handleAuthClick}
          loading={loading}
        />
      </div>
    </nav>
  );
};

export default Navigation;
