import { NavLink } from "react-router-dom";
import { 
  MessageSquare, 
  Calendar, 
  Bell, 
  Search, 
  Bookmark, 
  User, 
  Star 
} from "lucide-react";
import { cn } from "@/lib/utils";

const UserDashboardSidebar = () => {
  const links = [
    {
      title: "Messages",
      icon: MessageSquare,
      href: "/dashboard/messages",
    },
    {
      title: "Bookings",
      icon: Calendar,
      href: "/dashboard/bookings",
    },
    {
      title: "Notifications",
      icon: Bell,
      href: "/dashboard/notifications",
    },
    {
      title: "Course Matches",
      icon: Search,
      href: "/dashboard/matches",
    },
    {
      title: "Saved Classes",
      icon: Bookmark,
      href: "/dashboard/saved",
    },
    {
      title: "Profile",
      icon: User,
      href: "/dashboard/profile",
    },
    {
      title: "Reviews",
      icon: Star,
      href: "/dashboard/reviews",
    },
  ];

  return (
    <aside className="w-64 border-r border-border bg-background">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-6">Dashboard</h2>
        <nav className="space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                )
              }
            >
              <link.icon className="h-4 w-4" />
              {link.title}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default UserDashboardSidebar;