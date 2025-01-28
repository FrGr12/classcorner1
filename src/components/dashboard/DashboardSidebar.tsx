import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Bell,
  BookOpen,
  Calendar,
  Heart,
  Home,
  MessageCircle,
  Settings,
  Star,
} from "lucide-react";

const menuItems = [
  { icon: Home, label: "Overview", href: "/dashboard" },
  { icon: MessageCircle, label: "Messages", href: "/dashboard/messages" },
  { icon: Calendar, label: "Bookings", href: "/dashboard/bookings" },
  { icon: Bell, label: "Notifications", href: "/dashboard/notifications" },
  { icon: Heart, label: "Interests", href: "/dashboard/interests" },
  { icon: BookOpen, label: "Saved Classes", href: "/dashboard/saved" },
  { icon: Star, label: "Reviews", href: "/dashboard/reviews" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

const DashboardSidebar = () => {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <div className="flex items-center px-6 py-4">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-display">classcorner</span>
          </Link>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "w-full",
                      location.pathname === item.href &&
                        "bg-accent-purple/10 text-accent-purple"
                    )}
                  >
                    <Link to={item.href} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;