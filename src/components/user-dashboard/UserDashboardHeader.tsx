
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquare,
  CalendarDays,
  Bell,
  Users,
  Bookmark,
  Star,
  Settings,
  Clock
} from "lucide-react";

const UserDashboardHeader = () => {
  const location = useLocation();

  const links = [
    {
      title: "Overview",
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
      title: "Saved",
      href: "/student-dashboard/saved",
      icon: Bookmark,
    },
    {
      title: "Settings",
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
    <header className="bg-white border-b">
      <div className="px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <h1 className="text-xl font-semibold">Student Dashboard</h1>
        </div>
      </div>
      <nav className="flex overflow-x-auto border-b px-4">
        <div className="flex space-x-4 pb-3">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap",
                location.pathname === link.href
                  ? "bg-[#6E44FF] text-white"
                  : "text-gray-600 hover:text-[#6E44FF] hover:bg-[#6E44FF]/10"
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.title}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default UserDashboardHeader;
