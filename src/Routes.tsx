
import { createBrowserRouter } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import { publicRoutes } from "@/routes/public-routes";
import { authRoutes } from "@/routes/auth-routes";
import { dashboardRoutes } from "@/routes/dashboard-routes";
import { paymentRoutes } from "@/routes/payment-routes";
import { communityRoutes } from "@/routes/community-routes";

const router = createBrowserRouter([
  // Public routes
  ...publicRoutes,
  
  // Authentication routes
  ...authRoutes,
  
  // Dashboard routes
  ...dashboardRoutes,
  
  // Payment routes
  ...paymentRoutes,
  
  // Community routes
  ...communityRoutes,
  
  // Catch-all route
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
