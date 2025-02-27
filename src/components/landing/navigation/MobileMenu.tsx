
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, School, BookOpen, Users, LayoutDashboard, BellRing } from "lucide-react";
import { Link } from "react-router-dom";
import { useNotifications } from "@/hooks/useNotifications";
import { Badge } from "@/components/ui/badge";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  session: any;
  handleDashboardClick: () => void;
  handleLogout: () => void;
  handleAuthClick: () => void;
  loading: boolean;
}

export function MobileMenu({
  isOpen,
  setIsOpen,
  session,
  handleDashboardClick,
  handleLogout,
  handleAuthClick,
  loading,
}: MobileMenuProps) {
  const { notifications } = useNotifications(5);
  const unreadCount = notifications.filter(n => !n.read_at).length;

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
          <Link 
            to="/community" 
            className="text-sm text-primary hover:text-accent-purple transition-colors text-left"
            onClick={() => setIsOpen(false)}
          >
            Community
          </Link>

          {session && (
            <div className="flex flex-col gap-3 border-y border-neutral-200 py-4">
              <h3 className="text-sm font-semibold text-muted-foreground">Dashboard</h3>
              <Link 
                to="/dashboard"
                className="flex items-center justify-between text-sm hover:text-accent-purple transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center">
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  <span>Teacher Dashboard</span>
                </div>
                {unreadCount > 0 && (
                  <Badge variant="default" className="bg-accent-purple text-[10px] h-5 px-1">
                    {unreadCount}
                  </Badge>
                )}
              </Link>
              <Link 
                to="/dashboard/classes"
                className="flex items-center justify-between text-sm hover:text-accent-purple transition-colors pl-6"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  <span>My Classes</span>
                </div>
              </Link>
              <Link 
                to="/dashboard/inbox"
                className="flex items-center justify-between text-sm hover:text-accent-purple transition-colors pl-6"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center">
                  <BellRing className="h-4 w-4 mr-2" />
                  <span>Notifications</span>
                </div>
                {unreadCount > 0 && (
                  <Badge variant="default" className="bg-accent-purple text-[10px] h-5 px-1">
                    {unreadCount}
                  </Badge>
                )}
              </Link>
            </div>
          )}

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
