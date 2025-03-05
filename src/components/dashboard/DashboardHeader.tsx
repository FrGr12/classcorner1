
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquare,
  PlusCircle,
  User,
  Users,
  BookOpen,
  BarChart,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const DashboardHeader = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const links = [
    {
      title: t("dashboard.overview"),
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: t("dashboard.classes"),
      href: "/dashboard/classes",
      icon: BookOpen,
    },
    {
      title: t("dashboard.createClass"),
      href: "/dashboard/create-class",
      icon: PlusCircle,
    },
    {
      title: t("dashboard.inbox"),
      href: "/dashboard/inbox",
      icon: MessageSquare,
    },
    {
      title: t("dashboard.contacts"),
      href: "/dashboard/contacts",
      icon: Users,
    },
    {
      title: t("dashboard.stats"),
      href: "/dashboard/stats",
      icon: BarChart,
    },
    {
      title: t("dashboard.profile"),
      href: "/dashboard/profile",
      icon: User,
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
              <Button variant="ghost" size="icon" className="mr-2 md:hidden">
                <LayoutDashboard className="h-5 w-5 text-[#6E44FF]" />
              </Button>
            </Link>
            <h1 className="text-base sm:text-xl font-semibold">{t("dashboard.title")}</h1>
          </div>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 p-0">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">{t("dashboard.menu")}</h2>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <nav className="flex flex-col gap-1 p-4">
                <NavLinks />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <nav className="hidden md:flex overflow-x-auto border-b">
        <div className="flex space-x-2 px-4 pb-3">
          <NavLinks />
        </div>
      </nav>
    </header>
  );
};

export default DashboardHeader;
