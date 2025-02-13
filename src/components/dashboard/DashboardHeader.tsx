
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquare,
  PlusCircle,
  User,
  Users,
  BookOpen,
  BarChart,
  Target,
} from "lucide-react";

const DashboardHeader = () => {
  const location = useLocation();

  const links = [
    {
      title: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Classes",
      href: "/dashboard/classes",
      icon: BookOpen,
    },
    {
      title: "Create Class",
      href: "/dashboard/create-class",
      icon: PlusCircle,
    },
    {
      title: "Matches",
      href: "/dashboard/matches",
      icon: Target,
    },
    {
      title: "Inbox",
      href: "/dashboard/inbox",
      icon: MessageSquare,
    },
    {
      title: "Contacts",
      href: "/dashboard/contacts",
      icon: Users,
    },
    {
      title: "Stats",
      href: "/dashboard/stats",
      icon: BarChart,
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
  ];

  return (
    <header className="bg-white border-b">
      <div className="px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <h1 className="text-xl font-semibold">Teacher Dashboard</h1>
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

export default DashboardHeader;
