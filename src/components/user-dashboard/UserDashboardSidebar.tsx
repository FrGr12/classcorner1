import { Link, useLocation } from "react-router-dom";
import { 
  MessageSquare, 
  Calendar, 
  Bell, 
  Heart, 
  Star, 
  User,
  BookOpen,
  LogOut,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useSidebar } from "@/contexts/SidebarContext";

const UserDashboardSidebar = () => {
  const location = useLocation();
  const { toast } = useToast();
  const { isOpen, toggle } = useSidebar();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out successfully"
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error logging out",
        description: error.message
      });
    }
  };

  const menuItems = [
    { icon: MessageSquare, label: "Messages", path: "/user-dashboard/messages" },
    { icon: Calendar, label: "Bookings", path: "/user-dashboard/bookings" },
    { icon: Bell, label: "Notifications", path: "/user-dashboard/notifications" },
    { icon: BookOpen, label: "Matches", path: "/user-dashboard/matches" },
    { icon: Heart, label: "Saved Classes", path: "/user-dashboard/saved" },
    { icon: User, label: "Profile", path: "/user-dashboard/profile" },
    { icon: Star, label: "Reviews", path: "/user-dashboard/reviews" },
  ];

  return (
    <aside className={`${isOpen ? 'w-64' : 'w-20'} bg-white border-r border-neutral-200 h-screen sticky top-0 transition-all duration-300`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full"></div>
            {isOpen && <span className="text-xl font-semibold">classcorner</span>}
          </Link>
          <Button variant="ghost" size="icon" onClick={toggle} className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-primary text-white' 
                    : 'text-neutral-600 hover:bg-neutral-100'}`}
              >
                <Icon className="w-5 h-5" />
                {isOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3" 
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            {isOpen && <span>Log Out</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default UserDashboardSidebar;