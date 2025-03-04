
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { DesktopMenu } from "./navigation/DesktopMenu";
import { MobileMenu } from "./navigation/MobileMenu";
import IntegratedSearch from "./search/IntegratedSearch";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "../language/LanguageSwitcher";

const Navigation = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Mock auth state for demonstration purposes
  // In a real app, this would come from your auth provider
  const [loading, setLoading] = useState(false);
  const session = null; // Replace with actual session when auth is implemented

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsScrolled(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Handle auth and dashboard navigation
  const handleAuthClick = () => {
    console.log("Auth click");
    // Implement actual auth logic here
  };

  const handleDashboardClick = () => {
    console.log("Dashboard click");
    // Implement navigation to dashboard
  };

  const handleLogout = () => {
    console.log("Logout click");
    // Implement actual logout logic
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${isScrolled ? "bg-white shadow-sm" : "bg-transparent"}`}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="font-bold text-xl">CraftClass</span>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 items-center justify-center px-2">
            <IntegratedSearch />
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/browse" className="text-sm font-medium text-neutral-700 hover:text-accent-purple transition-colors">
              {t("nav.browse")}
            </Link>
            <Link to="/teach" className="text-sm font-medium text-neutral-700 hover:text-accent-purple transition-colors">
              {t("nav.teach")}
            </Link>
            <LanguageSwitcher variant="minimal" />
            <DesktopMenu 
              session={session}
              handleDashboardClick={handleDashboardClick}
              handleLogout={handleLogout}
              handleAuthClick={handleAuthClick}
              loading={loading}
            />
          </div>

          <div className="flex md:hidden items-center space-x-3">
            <LanguageSwitcher variant="minimal" />
            <MobileMenu 
              isOpen={isMobileMenuOpen}
              setIsOpen={setIsMobileMenuOpen}
              session={session}
              handleDashboardClick={handleDashboardClick}
              handleLogout={handleLogout}
              handleAuthClick={handleAuthClick}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
