
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import IntegratedSearch from "./search/IntegratedSearch";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronDown, BookOpen, Users, School, Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  const MobileMenu = () => (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[85%] sm:w-[385px] bg-white/95 backdrop-blur-sm">
        <SheetHeader>
          <SheetTitle className="text-left text-accent-purple">Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-8 flex flex-col gap-4">
          <Link 
            to="/about" 
            className="text-sm text-primary hover:text-accent-purple transition-colors text-left"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <div className="flex flex-col gap-3 border-y border-neutral-200 py-4">
            <Link 
              to="/teach" 
              className="flex items-center gap-2 text-sm hover:text-accent-purple transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <School className="h-4 w-4" />
              <span>Start Teaching</span>
            </Link>
            <Link 
              to="/resources" 
              className="flex items-center gap-2 text-sm hover:text-accent-purple transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <BookOpen className="h-4 w-4" />
              <span>Resources</span>
            </Link>
            <Link 
              to="/community" 
              className="flex items-center gap-2 text-sm hover:text-accent-purple transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Users className="h-4 w-4" />
              <span>Community</span>
            </Link>
          </div>
          {session ? (
            <>
              <Button
                variant="ghost"
                className="justify-start px-0 text-sm hover:text-accent-purple"
                onClick={() => {
                  navigate("/dashboard");
                  setIsOpen(false);
                }}
              >
                Dashboard
              </Button>
              <Button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                variant="ghost"
                className="justify-start px-0 text-sm hover:text-accent-purple"
                disabled={loading}
              >
                Sign out
              </Button>
            </>
          ) : (
            <Button
              onClick={() => {
                handleAuthClick();
                setIsOpen(false);
              }}
              variant="ghost"
              className="justify-start px-0 text-sm hover:text-accent-purple"
              disabled={loading}
            >
              Sign in
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );

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
              <span className="text-base sm:text-xl font-display text-accent-purple">classcorner</span>
            </Link>
          </div>
          <MobileMenu />
        </div>
        
        {!isBrowsePage && <IntegratedSearch />}

        <div className="hidden md:flex items-center gap-4 ml-auto">
          <Link 
            to="/about" 
            className="text-xs text-primary hover:text-accent-purple transition-colors"
          >
            About
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-xs hover:text-accent-purple">
                For Teachers
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-white/95 backdrop-blur-sm">
              <DropdownMenuItem asChild>
                <Link to="/teach" className="flex items-center hover:text-accent-purple">
                  <School className="mr-2 h-4 w-4" />
                  <span>Start Teaching</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/resources" className="flex items-center hover:text-accent-purple">
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>Resources</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/community" className="flex items-center hover:text-accent-purple">
                  <Users className="mr-2 h-4 w-4" />
                  <span>Community</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {session ? (
            <>
              <Button
                variant="ghost"
                className="text-xs hover:text-accent-purple"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </Button>
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="text-xs hover:text-accent-purple"
                disabled={loading}
              >
                Sign out
              </Button>
            </>
          ) : (
            <Button
              onClick={handleAuthClick}
              variant="ghost"
              className="text-xs hover:text-accent-purple"
              disabled={loading}
            >
              Sign in
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
