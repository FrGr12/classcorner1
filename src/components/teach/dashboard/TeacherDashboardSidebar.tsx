import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  UserCircle,
  Users,
  Calendar,
  BookOpen,
  ChartBar,
  MessageSquare,
  Star,
  Tag,
  Bell,
  Menu,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebarContext } from "@/contexts/SidebarContext";

const navigation = [
  { name: "Overview", href: "/teach", icon: LayoutDashboard },
  { name: "Profile", href: "/teach/profile", icon: UserCircle },
  { name: "CRM", href: "/teach/crm", icon: Users },
  { name: "Bookings", href: "/teach/bookings", icon: Calendar },
  { name: "Classes", href: "/teach/classes", icon: BookOpen },
  { name: "Analytics", href: "/teach/analytics", icon: ChartBar },
  { name: "Messages", href: "/teach/messages", icon: MessageSquare },
  { name: "Reviews", href: "/teach/reviews", icon: Star },
  { name: "Promotions", href: "/teach/promotions", icon: Tag },
  { name: "Waitlist", href: "/teach/waitlist", icon: Bell },
  { name: "Payments", href: "/teach/payments", icon: Wallet },
];

const TeacherDashboardSidebar = () => {
  const { isOpen, toggle } = useSidebarContext();
  const location = useLocation();

  return (
    <>
      <div
        className={`fixed inset-0 z-20 bg-black/80 lg:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={toggle}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
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
          {navigation.map((item) => (
            <Button
              key={item.name}
              variant={location.pathname === item.href ? "default" : "ghost"}
              className="w-full justify-start gap-3"
              asChild
            >
              <Link to={item.href}>
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            </Button>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default TeacherDashboardSidebar;