
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, School, BookOpen, Users, LayoutDashboard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DesktopMenuProps {
  session: any;
  handleDashboardClick: () => void;
  handleLogout: () => void;
  handleAuthClick: () => void;
  loading: boolean;
}

export function DesktopMenu({
  session,
  handleDashboardClick,
  handleLogout,
  handleAuthClick,
  loading,
}: DesktopMenuProps) {
  return (
    <div className="hidden md:flex items-center gap-4 ml-auto">
      <Link 
        to="/community" 
        className="text-xs text-primary hover:text-accent-purple transition-colors"
      >
        Community
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
            <Link to="/auth" state={{ returnTo: '/dashboard/create-class' }} className="flex items-center hover:text-accent-purple">
              <School className="mr-2 h-4 w-4" />
              <span>Start Teaching</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/community/resource/beginner-guides" className="flex items-center hover:text-accent-purple">
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

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="text-xs hover:text-accent-purple">
            Dashboard
            <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-sm">
          <DropdownMenuItem asChild className="p-2">
            <Link to={session ? "/dashboard" : "/auth"} className="flex items-center hover:text-accent-purple w-full">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Teacher Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="p-2">
            <Link to={session ? "/user-dashboard" : "/auth"} className="flex items-center hover:text-accent-purple w-full">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Student Dashboard</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {session ? (
        <>
          <Button
            variant="ghost"
            className="text-xs hover:text-accent-purple"
            onClick={handleDashboardClick}
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
  );
}
