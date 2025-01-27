import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import IntegratedSearch from "./search/IntegratedSearch";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const isHomePage = location.pathname === "/";

  const handleAuthClick = () => {
    navigate("/auth");
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast({
        title: "Logged out successfully",
      });
    } catch (error) {
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
        <div className="flex items-center gap-4 min-w-fit">
          {!isHomePage && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleBack}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <Link to="/" className="flex items-center">
            <span className="text-base sm:text-xl font-display text-neutral-800">classcorner</span>
          </Link>
        </div>
        
        <IntegratedSearch />

        <div className="hidden md:flex items-center gap-6 ml-auto">
          <Link 
            to="/about" 
            className="text-xs text-primary hover:text-primary/80 transition-colors"
          >
            About
          </Link>
          <Link 
            to="/teach" 
            className="text-xs text-primary hover:text-primary/80 transition-colors"
          >
            Start teaching
          </Link>
          <Button
            onClick={handleAuthClick}
            variant="ghost"
            className="text-xs"
            disabled={loading}
          >
            Sign in
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;