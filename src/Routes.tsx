
import { createBrowserRouter } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import { publicRoutes } from "@/routes/public-routes";
import { authRoutes } from "@/routes/auth-routes";
import { dashboardRoutes } from "@/routes/dashboard-routes";
import { paymentRoutes } from "@/routes/payment-routes";
import { communityRoutes } from "@/routes/community-routes";
import Dashboard from "@/pages/Dashboard";
import UserDashboard from "@/pages/UserDashboard";

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
  
  // Teacher Dashboard route
  {
    path: "/dashboard/*",
    element: <Dashboard />,
  },
  
  // Student Dashboard route
  {
    path: "/user-dashboard/*",
    element: <UserDashboard />,
  },
  
  // Catch-all route for 404 pages
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
