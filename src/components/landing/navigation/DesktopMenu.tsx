
import { Button } from "@/components/ui/button";

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
