
import { createBrowserRouter } from "react-router-dom";
import Index from "@/pages/Index";
import Browse from "@/pages/Browse";
import ClassDetails from "@/pages/ClassDetails";
import UserDashboard from "@/pages/UserDashboard";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import ErrorPage from "@/pages/ErrorPage";
import Auth from "@/pages/Auth";
import EmailVerification from "@/pages/EmailVerification";
import PasswordReset from "@/pages/PasswordReset";
import Onboarding from "@/pages/Onboarding";
import TeacherClasses from "@/components/teach/dashboard/TeacherClasses";
import TeacherProfile from "@/components/teach/dashboard/TeacherProfile";
import TeacherCRM from "@/components/teach/dashboard/TeacherCRM";
import TeacherBookings from "@/components/teach/dashboard/TeacherBookings";
import TeacherAnalytics from "@/components/teach/dashboard/TeacherAnalytics";
import TeacherReviews from "@/components/teach/dashboard/TeacherReviews";
import TeacherOverview from "@/components/teach/dashboard/TeacherOverview";
import EditClass from "@/components/teach/EditClass";
import UserDashboardOverview from "@/components/user-dashboard/UserDashboardOverview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/email-verification",
    element: <EmailVerification />,
  },
  {
    path: "/password-reset",
    element: <PasswordReset />,
  },
  {
    path: "/onboarding",
    element: <Onboarding />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/class/:category/:id",
    element: <ClassDetails />,
  },
  {
    path: "/dashboard/*",
    element: <Dashboard />,
    children: [
      { path: "", element: <TeacherOverview /> },
      { path: "profile", element: <TeacherProfile /> },
      { path: "crm", element: <TeacherCRM /> },
      { path: "bookings", element: <TeacherBookings /> },
      { path: "classes", element: <TeacherClasses /> },
      { path: "classes/:id/edit", element: <EditClass /> },
      { path: "analytics", element: <TeacherAnalytics /> },
      { path: "reviews", element: <TeacherReviews /> },
    ],
  },
  {
    path: "/user-dashboard/*",
    element: <UserDashboard />,
    children: [
      { path: "", element: <UserDashboardOverview /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
