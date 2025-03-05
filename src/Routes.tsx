
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
import { Fragment } from "react";

// Wrapper component to include AdminModeToggle with any route
const withAdminToggle = (element: React.ReactNode) => {
  return (
    <Fragment>
      {element}
      <AdminModeToggle />
    </Fragment>
  );
};

// Central router configuration that organizes all routes
const router = createBrowserRouter([
  // Public routes - accessible to all users
  ...publicRoutes,
  
  // Authentication routes - login, registration, password reset, etc.
  ...authRoutes,
  
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
