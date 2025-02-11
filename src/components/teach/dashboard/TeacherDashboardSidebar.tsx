
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  UserCircle,
  MessageSquare,
  BookOpen,
  Settings,
  PlusCircle,
  Menu,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebarContext } from "@/contexts/SidebarContext";

const TeacherDashboardSidebar = () => {
  const { isOpen, toggle } = useSidebarContext();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/teach" },
    { icon: BookOpen, label: "Classes & Bookings", path: "/teach/classes" },
    { icon: PlusCircle, label: "Create Class", path: "/teach/classes/new" },
    { icon: MessageSquare, label: "Messages", path: "/teach/messages" },
    { icon: Users, label: "Waitlist", path: "/teach/waitlist" },
    { icon: UserCircle, label: "Profile", path: "/teach/profile" },
    { icon: Settings, label: "Settings", path: "/teach/settings" },
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
              <Button
                variant={location.pathname === item.path ? "default" : "ghost"}
                className={`w-full justify-start gap-3 ${
                  location.pathname === item.path 
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "hover:bg-primary/10 hover:text-primary"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Button>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default TeacherDashboardSidebar;

