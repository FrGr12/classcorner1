
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  BookOpen,
  Settings,
  PlusCircle,
  Menu,
  Users,
  BarChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebarContext } from "@/contexts/SidebarContext";

const TeacherDashboardSidebar = () => {
  const { isOpen, toggle } = useSidebarContext();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/dashboard/teach" },
    { icon: BookOpen, label: "Classes & Bookings", path: "/dashboard/teach/classes" },
    { icon: PlusCircle, label: "Create Class", path: "/dashboard/teach/classes/new" },
    { icon: MessageSquare, label: "Messages", path: "/dashboard/teach/messages" },
    { icon: Users, label: "Waitlist", path: "/dashboard/teach/waitlist" },
    { icon: BarChart, label: "Stats & Insights", path: "/dashboard/teach/stats" },
    { icon: Settings, label: "Settings", path: "/dashboard/teach/settings" },
  ];

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
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <div
                className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? "bg-[#6E44FF] text-white"
                    : "text-gray-700 hover:bg-[#6E44FF]/10 hover:text-[#6E44FF] active:bg-[#6E44FF] active:text-white"
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default TeacherDashboardSidebar;
