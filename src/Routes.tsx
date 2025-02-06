
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
import TeacherCRM from "@/components/teach/dashboard/TeacherCRM";
import TeacherClasses from "@/components/teach/dashboard/TeacherClasses";
import TeacherAnalytics from "@/components/teach/dashboard/TeacherAnalytics";
import TeacherReviews from "@/components/teach/dashboard/TeacherReviews";
import TeacherPromotions from "@/components/teach/dashboard/TeacherPromotions";
import PaymentHistory from "@/components/teach/dashboard/payments/PaymentHistory";
import TeacherPremium from "@/components/teach/dashboard/TeacherPremium";
import TeacherLearningHub from "@/components/teach/dashboard/learning-hub/TeacherLearningHub";
import EditClass from "@/components/teach/EditClass";
import TeacherSettings from "@/components/teach/dashboard/TeacherSettings";

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
      { path: "crm", element: <TeacherCRM /> },
      { path: "classes", element: <TeacherClasses /> },
      { path: "classes/:id/edit", element: <EditClass /> },
      { path: "analytics", element: <TeacherAnalytics /> },
      { path: "reviews", element: <TeacherReviews /> },
      { path: "promotions", element: <TeacherPromotions /> },
      { path: "payments", element: <PaymentHistory /> },
      { path: "premium", element: <TeacherPremium /> },
      { path: "learning-hub", element: <TeacherLearningHub /> },
      { path: "settings", element: <TeacherSettings /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;

