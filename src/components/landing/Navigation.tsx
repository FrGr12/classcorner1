import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import IntegratedSearch from "./search/IntegratedSearch";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TestTube2 } from "lucide-react";
import { MobileMenu } from "./navigation/MobileMenu";
import { DesktopMenu } from "./navigation/DesktopMenu";
import { UserType } from "@/types/user";
import { useDemoMode } from "@/contexts/DemoModeContext";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";

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
  const { isDemoMode, toggleDemoMode } = useDemoMode();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      
      if (session?.user?.id) {
        getUserType(session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      
      if (session?.user?.id) {
        getUserType(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const getUserType = async (userId: string) => {
    try {
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
    navigate(userType === 'student' ? '/user-dashboard' : '/dashboard');
  };

  const handleLogout = async () => {
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
            session={session}
            handleDashboardClick={handleDashboardClick}
            handleLogout={handleLogout}
            handleAuthClick={handleAuthClick}
            loading={loading}
            userType={userType}
          />
        </div>
        
        {!isBrowsePage && <IntegratedSearch />}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={isDemoMode ? "default" : "outline"}
                size="sm"
                className={`mr-2 ${isDemoMode ? "bg-amber-500 hover:bg-amber-600" : ""}`}
                onClick={toggleDemoMode}
              >
                <TestTube2 className="h-4 w-4 mr-2" />
                {isDemoMode ? "Demo On" : "Demo Off"}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="w-48 text-xs">
                {isDemoMode 
                  ? "Demo Mode is ON. All pages are accessible without login. Click to disable."
                  : "Click to enable Demo Mode to access all pages without login."}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DesktopMenu
          session={session}
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
