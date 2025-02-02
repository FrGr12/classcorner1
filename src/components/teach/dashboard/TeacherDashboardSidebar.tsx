import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  GraduationCap,
  MessageSquare,
  Users,
  Settings,
  BookOpen,
  BadgeDollarSign,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const TeacherDashboardSidebar = () => {
  const navigation = [
    {
      name: "Overview",
      href: "/teach",
      icon: LayoutDashboard
    },
    {
      name: "Classes",
      href: "/teach/classes",
      icon: GraduationCap
    },
    {
      name: "Messages",
      href: "/teach/messages",
      icon: MessageSquare
    },
    {
      name: "CRM",
      href: "/teach/crm",
      icon: Users
    },
    {
      name: "Reviews",
      href: "/teach/reviews",
      icon: Star
    },
    {
      name: "Learning Hub",
      href: "/teach/learning",
      icon: BookOpen
    },
    {
      name: "Premium",
      href: "/teach/premium",
      icon: BadgeDollarSign
    },
    {
      name: "Settings",
      href: "/teach/settings",
      icon: Settings
    }
  ];

  return (
    <ScrollArea className="w-64 border-r bg-white">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Teacher Dashboard</h2>
          <div className="space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-accent-foreground",
                    isActive 
                      ? "bg-accent text-accent-foreground" 
                      : "text-muted-foreground hover:bg-accent/50"
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default TeacherDashboardSidebar;