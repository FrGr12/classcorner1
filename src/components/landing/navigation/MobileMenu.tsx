
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, School, BookOpen, Users, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import { UserType } from "@/types/user";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  session: any;
  handleDashboardClick: () => void;
  handleLogout: () => void;
  handleAuthClick: () => void;
  loading: boolean;
  userType?: UserType;
}

export function MobileMenu({
  isOpen,
  setIsOpen,
  session,
  handleDashboardClick,
  handleLogout,
  handleAuthClick,
  loading,
  userType = 'teacher',
}: MobileMenuProps) {
  const dashboardPath = userType === 'student' ? '/user-dashboard' : '/dashboard';

  return (
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
          <div className="flex flex-col gap-3 border-y border-neutral-200 py-4">
            <Link 
              to="/auth"
              state={{ returnTo: '/dashboard/create-class' }}
              className="flex items-center gap-2 text-sm hover:text-accent-purple transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <School className="h-4 w-4" />
              <span>Start Teaching</span>
            </Link>
            <Link 
              to="/community/resource/beginner-guides"
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
            <Link 
              to={session ? "/dashboard" : "/auth"}
              className="flex items-center gap-2 text-sm hover:text-accent-purple transition-colors"
              onClick={() => {
                setIsOpen(false);
                if (!session) {
                  handleAuthClick();
                }
              }}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Teacher Dashboard</span>
            </Link>
            <Link 
              to={session ? "/user-dashboard" : "/auth"}
              className="flex items-center gap-2 text-sm hover:text-accent-purple transition-colors"
              onClick={() => {
                setIsOpen(false);
                if (!session) {
                  handleAuthClick();
                }
              }}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Student Dashboard</span>
            </Link>
          </div>
          {session ? (
            <>
              <Button
                variant="ghost"
                className="justify-start px-0 text-sm hover:text-accent-purple"
                onClick={() => {
                  handleDashboardClick();
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
}
