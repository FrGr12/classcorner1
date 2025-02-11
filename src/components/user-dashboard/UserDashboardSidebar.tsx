
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  MessageSquare,
  CalendarDays,
  Bell,
  Users,
  Bookmark,
  Star,
  Settings,
  Menu,
  Clock
} from "lucide-react";
import { useSidebarContext } from "@/contexts/SidebarContext";

const UserDashboardSidebar = () => {
  const location = useLocation();
  const { isOpen, toggle } = useSidebarContext();

  const links = [
    {
      title: "Dashboard",
      href: "/student-dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Messages",
      href: "/student-dashboard/messages",
      icon: MessageSquare,
    },
    {
      title: "Bookings",
      href: "/student-dashboard/bookings",
      icon: CalendarDays,
    },
    {
      title: "Notifications",
      href: "/student-dashboard/notifications",
      icon: Bell,
    },
    {
      title: "Matches",
      href: "/student-dashboard/matches",
      icon: Users,
    },
    {
      title: "Saved Classes",
      href: "/student-dashboard/saved",
      icon: Bookmark,
    },
    {
      title: "Preferences",
      href: "/student-dashboard/preferences",
      icon: Settings,
    },
    {
      title: "Reviews",
      href: "/student-dashboard/reviews",
      icon: Star,
    },
    {
      title: "Waitlist",
      href: "/student-dashboard/waitlist",
      icon: Clock,
    },
  ];

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-20 bg-black/80 lg:hidden",
          isOpen ? "block" : "hidden"
        )}
        onClick={toggle}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-72 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Student Dashboard</h2>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={toggle}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <nav className="space-y-1 p-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "flex items-center w-full px-3 py-2 rounded-lg transition-colors",
                location.pathname === link.href
                  ? "bg-[#6E44FF] text-white"
                  : "text-gray-700 hover:bg-[#6E44FF]/10 hover:text-[#6E44FF] active:bg-[#6E44FF] active:text-white"
              )}
            >
              <link.icon className={cn(
                "h-5 w-5 mr-3",
                location.pathname === link.href
                  ? "text-white"
                  : "text-gray-500 group-hover:text-[#6E44FF]"
              )} />
              <span className="font-medium">{link.title}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default UserDashboardSidebar;
