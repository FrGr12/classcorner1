
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, School, BookOpen, Users, LayoutDashboard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-4">
      <Link 
        to="/community" 
        className="text-xs text-primary hover:text-accent-purple transition-colors"
      >
        {t("nav.community")}
      </Link>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="text-xs hover:text-accent-purple">
            {t("nav.forTeachers")}
            <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-white/95 backdrop-blur-sm">
          <DropdownMenuItem asChild>
            <Link to="/auth" state={{ returnTo: '/dashboard/create-class' }} className="flex items-center hover:text-accent-purple">
              <School className="mr-2 h-4 w-4" />
              <span>{t("nav.startTeaching")}</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/community/resource/beginner-guides" className="flex items-center hover:text-accent-purple">
              <BookOpen className="mr-2 h-4 w-4" />
              <span>{t("nav.resources")}</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/community" className="flex items-center hover:text-accent-purple">
              <Users className="mr-2 h-4 w-4" />
              <span>{t("nav.community")}</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="text-xs hover:text-accent-purple">
            {t("nav.dashboard")}
            <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-sm">
          <DropdownMenuItem asChild className="p-2">
            <Link to={session ? "/dashboard" : "/auth"} className="flex items-center hover:text-accent-purple w-full">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>{t("nav.teacherDashboard")}</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="p-2">
            <Link to={session ? "/user-dashboard" : "/auth"} className="flex items-center hover:text-accent-purple w-full">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>{t("nav.studentDashboard")}</span>
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
            {t("nav.dashboard")}
          </Button>
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="text-xs hover:text-accent-purple"
            disabled={loading}
          >
            {t("nav.signOut")}
          </Button>
        </>
      ) : (
        <Button
          onClick={handleAuthClick}
          variant="ghost"
          className="text-xs hover:text-accent-purple"
          disabled={loading}
        >
          {t("nav.signIn")}
        </Button>
      )}
    </div>
  );
}
