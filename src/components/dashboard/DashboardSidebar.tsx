import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  UserCircle,
  Users,
  Calendar,
  BookOpen,
  BarChart,
  MessageSquare,
  Star,
  Tag,
  Menu,
  ClipboardList,
} from "lucide-react";
import { useSidebarContext } from "@/contexts/SidebarContext";

const DashboardSidebar = () => {
  const location = useLocation();
  const { isOpen, toggle } = useSidebarContext();

  const links = [
    {
      title: "Dashboard Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Profile Management",
      href: "/dashboard/profile",
      icon: UserCircle,
    },
    {
      title: "CRM & Messaging",
      href: "/dashboard/crm",
      icon: MessageSquare,
    },
    {
      title: "Booking & Waitlist",
      href: "/dashboard/bookings",
      icon: ClipboardList,
    },
    {
      title: "Class & Schedule",
      href: "/dashboard/classes",
      icon: BookOpen,
    },
    {
      title: "Analytics & Insights",
      href: "/dashboard/analytics",
      icon: BarChart,
    },
    {
      title: "Reviews & Testimonials",
      href: "/dashboard/reviews",
      icon: Star,
    },
    {
      title: "Promotional Tools",
      href: "/dashboard/promotions",
      icon: Tag,
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
          "fixed inset-y-0 left-0 z-30 w-64 transform bg-white border-r border-gray-200 transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <h2 className="text-xl font-semibold">Teacher Dashboard</h2>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={toggle}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <nav className="space-y-1 p-4">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                location.pathname === link.href
                  ? "bg-primary text-primary-foreground"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <link.icon className="h-5 w-5" />
              <span>{link.title}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default DashboardSidebar;