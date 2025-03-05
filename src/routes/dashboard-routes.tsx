
import { RouteObject } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import UserDashboard from "@/pages/UserDashboard";
import AuthGuard from "@/components/auth/AuthGuard";
import ErrorBoundary from "@/components/error/ErrorBoundary";

export const dashboardRoutes: RouteObject[] = [
  // Protected student routes
  {
    path: "/student-dashboard/*",
    element: (
      <AuthGuard>
        <ErrorBoundary>
          <UserDashboard />
        </ErrorBoundary>
      </AuthGuard>
    ),
  },
  // Protected teacher dashboard routes
  {
    path: "/dashboard/*",
    element: (
      <AuthGuard>
        <ErrorBoundary>
          <Dashboard />
        </ErrorBoundary>
      </AuthGuard>
    ),
  },
];
