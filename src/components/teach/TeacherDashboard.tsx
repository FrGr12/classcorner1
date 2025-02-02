import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  UserCircle,
  Users,
  Calendar,
  BookOpen,
  ChartBar,
  Star,
  Tag,
  Bell,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Overview", href: "", icon: LayoutDashboard },
  { name: "Profile", href: "profile", icon: UserCircle },
  { name: "CRM", href: "crm", icon: Users },
  { name: "Bookings", href: "bookings", icon: Calendar },
  { name: "Classes", href: "classes", icon: BookOpen },
  { name: "Analytics", href: "analytics", icon: ChartBar },
  { name: "Reviews", href: "reviews", icon: Star },
  { name: "Promotions", href: "promotions", icon: Tag },
  { name: "Waitlist", href: "waitlist", icon: Bell },
];

const TeacherDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggle = () => setIsOpen(!isOpen);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        {/* Overlay for mobile */}
        <div
          className={`fixed inset-0 z-20 bg-black/80 lg:hidden ${
            isOpen ? "block" : "hidden"
          }`}
          onClick={toggle}
        />
        
        {/* Sidebar */}
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
                variant="ghost"
                className="w-full justify-start gap-3"
                onClick={() => navigate(item.href)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="min-h-screen p-8">
            <div className="mx-auto max-w-7xl">
              <div className="md:hidden">
                <Button
                  variant="outline"
                  size="icon"
                  className="mb-4"
                  onClick={toggle}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </div>
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default TeacherDashboard;