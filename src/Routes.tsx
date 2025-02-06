
import { createBrowserRouter } from "react-router-dom";
import Index from "@/pages/Index";
import Browse from "@/pages/Browse";
import ClassDetails from "@/pages/ClassDetails";
import UserDashboard from "@/pages/UserDashboard";
import TeacherDashboard from "@/components/teach/dashboard/TeacherDashboard";
import Teach from "@/pages/Teach";
import NotFound from "@/pages/NotFound";
import ErrorPage from "@/pages/ErrorPage";
import Auth from "@/pages/Auth";
import EmailVerification from "@/pages/EmailVerification";
import PasswordReset from "@/pages/PasswordReset";
import Onboarding from "@/pages/Onboarding";

// Import teacher dashboard components
import TeacherOverview from "@/components/teach/dashboard/TeacherOverview";
import TeacherProfile from "@/components/teach/dashboard/TeacherProfile";
import TeacherMessages from "@/components/teach/dashboard/TeacherMessages";
import TeacherClasses from "@/components/teach/dashboard/TeacherClasses";
import TeacherWaitlist from "@/components/teach/dashboard/TeacherWaitlist";
import TeacherSettings from "@/components/teach/dashboard/TeacherSettings";
import EditClass from "@/components/teach/EditClass";

// Import user dashboard components
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
    element: <UserDashboard />,
    children: [
      { path: "", element: <UserDashboardOverview /> },
    ],
  },
  {
    path: "/teach/*",
    element: <TeacherDashboard />,
    children: [
      { path: "", element: <TeacherOverview /> },
      { path: "profile", element: <TeacherProfile /> },
      { path: "messages", element: <TeacherMessages /> },
      { path: "classes", element: <TeacherClasses /> },
      { path: "classes/:id/edit", element: <EditClass /> },
      { path: "waitlist", element: <TeacherWaitlist /> },
      { path: "settings", element: <TeacherSettings /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
