
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquare,
  CalendarDays,
  Settings,
  Menu,
  ArrowLeft,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const UserDashboardHeader = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    {
      title: "Overview",
      href: "/student-dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Messages",
      href: "/student-dashboard/messages",
      icon: MessageSquare,
    },
    {
      title: "Classes and Bookings",
      href: "/student-dashboard/bookings",
      icon: CalendarDays,
    },
    {
      title: "Settings",
      href: "/student-dashboard/preferences",
      icon: Settings,
    },
  ];

  const NavLinks = () => (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          to={link.href}
          onClick={() => setIsOpen(false)}
          className={cn(
            "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap",
            location.pathname === link.href
              ? "bg-[#6E44FF] text-white"
              : "text-gray-600 hover:text-[#6E44FF] hover:bg-[#6E44FF]/10"
          )}
        >
          <link.icon className="h-4 w-4" />
          {link.title}
        </Link>
      ))}
    </>
  );

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="ghost" size="icon" className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold">Student Dashboard</h1>
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <nav className="flex flex-col gap-1 mt-4">
                <NavLinks />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <nav className="hidden lg:flex overflow-x-auto border-b px-4">
        <div className="flex space-x-4 pb-3">
          <NavLinks />
        </div>
      </nav>
    </header>
  );
};

export default UserDashboardHeader;
