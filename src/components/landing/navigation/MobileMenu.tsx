
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  BookOpen, 
  MessageSquare, 
  UserCircle, 
  CalendarDays,
  LogOut 
} from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  isTeacher?: boolean;
  onSignOut: () => void;
}

const MobileMenu = ({
  isOpen,
  onClose,
  isAuthenticated,
  isTeacher,
  onSignOut
}: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white md:hidden">
      <div className="flex flex-col h-full overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <Link to="/" className="flex items-center space-x-2" onClick={onClose}>
            <span className="font-bold text-xl">ClassConnect</span>
          </Link>
          <button onClick={onClose}>
            <span className="sr-only">Close menu</span>
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <nav className="space-y-4">
            <Link
              to="/"
              className="block py-2 text-base font-medium"
              onClick={onClose}
            >
              Home
            </Link>
            <Link
              to="/browse"
              className="block py-2 text-base font-medium"
              onClick={onClose}
            >
              Browse Classes
            </Link>
            <Link
              to="/community"
              className="block py-2 text-base font-medium"
              onClick={onClose}
            >
              Community
            </Link>
            <Link
              to="/teach"
              className="block py-2 text-base font-medium"
              onClick={onClose}
            >
              Teach
            </Link>
            
            {isAuthenticated && (
              <>
                <div className="pt-4 pb-2 border-t">
                  <h3 className="text-sm font-semibold text-muted-foreground">Dashboards</h3>
                </div>
                <Link
                  to="/student-dashboard"
                  className="flex items-center py-2 text-base font-medium"
                  onClick={onClose}
                >
                  <LayoutDashboard className="mr-2 h-5 w-5 text-[#6E44FF]" />
                  Student Dashboard
                </Link>
                {isTeacher && (
                  <>
                    <Link
                      to="/dashboard"
                      className="flex items-center py-2 text-base font-medium"
                      onClick={onClose}
                    >
                      <LayoutDashboard className="mr-2 h-5 w-5 text-[#6E44FF]" />
                      Teacher Dashboard
                    </Link>
                    <Link
                      to="/dashboard/classes"
                      className="flex items-center py-2 text-base font-medium pl-8"
                      onClick={onClose}
                    >
                      <BookOpen className="mr-2 h-5 w-5 text-[#6E44FF]" />
                      My Classes
                    </Link>
                    <Link
                      to="/dashboard/inbox"
                      className="flex items-center py-2 text-base font-medium pl-8"
                      onClick={onClose}
                    >
                      <MessageSquare className="mr-2 h-5 w-5 text-[#6E44FF]" />
                      Inbox
                    </Link>
                    <Link
                      to="/dashboard/profile"
                      className="flex items-center py-2 text-base font-medium pl-8"
                      onClick={onClose}
                    >
                      <UserCircle className="mr-2 h-5 w-5 text-[#6E44FF]" />
                      Profile
                    </Link>
                  </>
                )}
                
                <Link
                  to="/student-dashboard/bookings"
                  className="flex items-center py-2 text-base font-medium pl-8"
                  onClick={onClose}
                >
                  <CalendarDays className="mr-2 h-5 w-5 text-[#6E44FF]" />
                  My Bookings
                </Link>
                
                <div className="pt-4 pb-2 border-t">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      onSignOut();
                      onClose();
                    }}
                    className="w-full flex items-center justify-center"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </>
            )}
            
            {!isAuthenticated && (
              <div className="pt-4 border-t">
                <div className="flex gap-4 mt-4">
                  <Link to="/auth?mode=signin" className="flex-1" onClick={onClose}>
                    <Button variant="outline" className="w-full">Sign In</Button>
                  </Link>
                  <Link to="/auth?mode=signup" className="flex-1" onClick={onClose}>
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </div>
              </div>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
