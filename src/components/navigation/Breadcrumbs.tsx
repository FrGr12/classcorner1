
import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
}

export const Breadcrumbs = ({ items, showHome = true }: BreadcrumbsProps) => {
  return (
    <nav className="flex items-center text-sm text-muted-foreground mb-4">
      {showHome && (
        <Link 
          to="/" 
          className="flex items-center hover:text-accent-purple transition-colors"
        >
          <Home className="h-3.5 w-3.5 mr-1" />
          <span>Home</span>
        </Link>
      )}
      
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center">
          <ChevronRight className="h-3.5 w-3.5 mx-1.5" />
          {index === items.length - 1 ? (
            <span className="font-medium text-foreground">{item.label}</span>
          ) : (
            <Link 
              to={item.href}
              className="hover:text-accent-purple transition-colors"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export const useBreadcrumbs = (): BreadcrumbItem[] => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  // Define known routes and their friendly names
  const routeLabels: Record<string, string> = {
    "dashboard": "Dashboard",
    "student-dashboard": "Student Dashboard",
    "auth": "Authentication",
    "user-dashboard": "Dashboard",
    "community": "Community",
    "messages": "Messages",
    "profile": "Profile",
    "settings": "Settings",
    "bookings": "Bookings",
    "notifications": "Notifications",
    "matches": "Matches",
    "saved": "Saved Classes",
    "reviews": "Reviews",
    "waitlist": "Waitlist",
    "payments": "Payments",
    "preferences": "Preferences",
    "browse": "Browse Classes",
    "class": "Class",
    "instructor": "Instructor",
    "payment": "Payment",
    "payment-receipt": "Payment Receipt",
    "payment-failed": "Payment Failed",
    "booking-confirmation": "Booking Confirmation",
    "create-class": "Create Class",
    "inbox": "Inbox",
    "contacts": "Contacts",
    "classes": "Classes",
    "stats": "Statistics",
    "groups": "Groups",
    "resources": "Resources",
    "topic": "Topic",
    "category": "Category",
    "resource": "Resource",
    "post": "Post",
  };

  const breadcrumbs: BreadcrumbItem[] = [];
  let currentPath = "";

  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    // Skip certain segments like IDs (numeric or UUID patterns)
    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(segment) || 
        /^\d+$/.test(segment)) {
      return;
    }
    
    const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    
    breadcrumbs.push({
      label,
      href: currentPath
    });
  });

  return breadcrumbs;
};
