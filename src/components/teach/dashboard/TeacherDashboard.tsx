import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebarContext } from "@/contexts/SidebarContext";
import TeacherOverview from "./TeacherOverview";
import TeacherProfile from "./TeacherProfile";
import TeacherCRM from "./TeacherCRM";
import TeacherBookings from "./TeacherBookings";
import TeacherClasses from "./TeacherClasses";
import TeacherAnalytics from "./TeacherAnalytics";
import TeacherMessages from "./TeacherMessages";
import TeacherReviews from "./TeacherReviews";
import TeacherPromotions from "./TeacherPromotions";
import TeacherWaitlist from "./TeacherWaitlist";

const TeacherDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const { isOpen, toggle } = useSidebarContext();
  const navigate = useNavigate();

  const navigation = [
    { name: "Overview", href: "overview", icon: LayoutDashboard },
    { name: "Profile", href: "profile", icon: UserCircle },
    { name: "CRM", href: "crm", icon: Users },
    { name: "Bookings", href: "bookings", icon: Calendar },
    { name: "Classes", href: "classes", icon: BookOpen },
    { name: "Analytics", href: "analytics", icon: ChartBar },
    { name: "Messages", href: "messages", icon: MessageSquare },
    { name: "Reviews", href: "reviews", icon: Star },
    { name: "Promotions", href: "promotions", icon: Tag },
    { name: "Waitlist", href: "waitlist", icon: Bell },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <TeacherOverview />;
      case "profile":
        return <TeacherProfile />;
      case "crm":
        return <TeacherCRM />;
      case "bookings":
        return <TeacherBookings />;
      case "classes":
        return <TeacherClasses />;
      case "analytics":
        return <TeacherAnalytics />;
      case "messages":
        return <TeacherMessages />;
      case "reviews":
        return <TeacherReviews />;
      case "promotions":
        return <TeacherPromotions />;
      case "waitlist":
        return <TeacherWaitlist />;
      default:
        return <TeacherOverview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
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
              variant={activeSection === item.href ? "default" : "ghost"}
              className="w-full justify-start gap-3"
              onClick={() => setActiveSection(item.href)}
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
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;