
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import IntegratedSearch from "./search/IntegratedSearch";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { MobileMenu } from "./navigation/MobileMenu";
import { DesktopMenu } from "./navigation/DesktopMenu";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const isHomePage = location.pathname === "/";
  const isBrowsePage = location.pathname === "/browse";

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthClick = () => {
    navigate("/auth");
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleDashboardClick = () => {
    navigate("/dashboard");
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
                size="icon"
                className="h-8 w-8 hover:text-accent-purple"
                onClick={handleBack}
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
          />
        </div>
        
        {!isBrowsePage && <IntegratedSearch />}

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
