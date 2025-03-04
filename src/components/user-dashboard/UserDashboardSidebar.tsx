import {
  Calendar,
  CreditCard,
  Heart,
  Home,
  Settings,
  Users,
  Wallet,
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface NavItem {
  name: string;
  href: string;
  icon: any;
}

const UserDashboardSidebar = () => {
  return (
    <div className="flex flex-col h-full gap-4 py-4">
      <NavLink
        to="/"
        className="px-4 py-2 text-sm font-medium rounded-md hover:bg-secondary"
      >
        Back to Home
      </NavLink>
      <div className="space-y-1">
        {navigation.map((item: NavItem) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md hover:bg-secondary ${
                isActive ? "bg-secondary" : ""
              }`
            }
          >
            <item.icon className="w-4 h-4" />
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default UserDashboardSidebar;

const navigation = [
  { name: "Dashboard", href: "/student-dashboard", icon: Home },
  { name: "Profile", href: "/student-dashboard/profile", icon: Users },
  { name: "Settings", href: "/student-dashboard/settings", icon: Settings },
  { name: "Bookings", href: "/student-dashboard/bookings", icon: Calendar },
  { name: "Payments", href: "/student-dashboard/payments", icon: CreditCard },
  { name: "Payment Methods", href: "/student-dashboard/payment-methods", icon: Wallet },
  { name: "Saved Classes", href: "/student-dashboard/saved", icon: Heart },
];
