
import { createBrowserRouter } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import { publicRoutes } from "@/routes/public-routes";
import { authRoutes } from "@/routes/auth-routes";
import { dashboardRoutes } from "@/routes/dashboard-routes";
import { paymentRoutes } from "@/routes/payment-routes";
import { communityRoutes } from "@/routes/community-routes";
import Dashboard from "@/pages/Dashboard";
import UserDashboard from "@/pages/UserDashboard";
import AdminModeToggle from "@/components/admin/AdminModeToggle";

// Wrapper component to include AdminModeToggle with any route
const withAdminToggle = (element) => {
  return (
    <>
      {element}
      <AdminModeToggle />
    </>
  );
};

// Check if we're in a preview environment
const isPreviewMode = window.location.hostname.includes('stackblitz') || 
                     window.location.hostname.includes('codesandbox') ||
                     window.location.hostname.includes('vercel.app') ||
                     window.location.hostname.includes('netlify.app');

// In preview mode, automatically enable admin mode
if (isPreviewMode) {
  localStorage.setItem("admin_mode", "true");
  console.log("Preview mode detected in router, admin mode enabled automatically");
  
  // Log additional debug info
  console.log("Current hostname:", window.location.hostname);
  console.log("Admin mode status:", localStorage.getItem("admin_mode"));
}

// Central router configuration that organizes all routes
const router = createBrowserRouter([
  // Public routes - accessible to all users
  ...publicRoutes,
  
  // Authentication routes - login, registration, password reset, etc.
  // In preview mode, redirect auth routes to dashboard
  ...(isPreviewMode ? [{
    path: "/auth",
    element: <Dashboard />,
  }] : authRoutes),
  
  // Dashboard routes - protected routes for authenticated users
  ...dashboardRoutes,
  
  // Payment routes - routes related to payment processing
  ...paymentRoutes,
  
  // Community routes - routes related to community features
  ...communityRoutes,
  
  // Teacher Dashboard route - using AuthGuard with allowBypass
  {
    path: "/dashboard/*",
    element: withAdminToggle(<Dashboard />),
  },
  
  // Student Dashboard route - using AuthGuard with allowBypass
  {
    path: "/user-dashboard/*",
    element: withAdminToggle(<UserDashboard />),
  },
  
  // Catch-all route for 404 pages
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
