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
import TeacherOverview from "./dashboard/TeacherOverview";
import TeacherProfile from "./dashboard/TeacherProfile";
import TeacherCRM from "./dashboard/TeacherCRM";
import TeacherBookings from "./dashboard/TeacherBookings";
import TeacherClasses from "./dashboard/TeacherClasses";
import TeacherAnalytics from "./dashboard/TeacherAnalytics";
import TeacherMessages from "./dashboard/TeacherMessages";
import TeacherReviews from "./dashboard/TeacherReviews";
import TeacherPromotions from "./dashboard/TeacherPromotions";
import TeacherWaitlist from "./dashboard/TeacherWaitlist";

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

const TeacherDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const { isOpen, toggle } = useSidebarContext();
  const navigate = useNavigate();

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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-xl font-bold">Teacher Dashboard</h2>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggle}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          <Separator />
          <nav className="flex-1 space-y-1 p-2">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant={activeSection === item.href ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveSection(item.href)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
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
      </div>
    </div>
  );
};

export default TeacherDashboard;