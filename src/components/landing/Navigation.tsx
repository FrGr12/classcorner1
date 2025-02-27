
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MobileMenu from "./navigation/MobileMenu";
import DesktopMenu from "./navigation/DesktopMenu";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();
      return data.session;
    },
  });

  const { data: profile } = useQuery({
    queryKey: ['profile', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('first_name, last_name, is_teacher')
        .eq('id', session.user.id)
        .single();
        
      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const isTeacher = profile?.is_teacher;
  const userName = profile?.first_name || 'User';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl hidden sm:inline-block">ClassConnect</span>
            <span className="font-bold text-xl sm:hidden">CC</span>
          </Link>
          <nav className="hidden md:flex space-x-4 lg:space-x-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                location.pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Home
            </Link>
            <Link
              to="/browse"
              className={`text-sm font-medium transition-colors ${
                location.pathname === "/browse" ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Browse Classes
            </Link>
            <Link
              to="/community"
              className={`text-sm font-medium transition-colors ${
                location.pathname === "/community" ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Community
            </Link>
            <Link
              to="/teach"
              className={`text-sm font-medium transition-colors ${
                location.pathname === "/teach" ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Teach
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-full h-8 w-8 p-0">
                  <User className="h-4 w-4" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Hi, {userName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/student-dashboard">Student Dashboard</Link>
                </DropdownMenuItem>
                {isTeacher && (
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Teacher Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/auth?mode=signin" className="hidden sm:inline-block">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth?mode=signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
          <button
            className="ml-2 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)}
        isAuthenticated={!!session}
        isTeacher={!!isTeacher}
        onSignOut={handleSignOut}
      />
    </header>
  );
};

export default Navigation;
