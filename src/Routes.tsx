
import { createBrowserRouter } from "react-router-dom";
import Index from "@/pages/Index";
import Browse from "@/pages/Browse";
import ClassDetails from "@/pages/ClassDetails";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import ErrorPage from "@/pages/ErrorPage";
import Auth from "@/pages/Auth";
import EmailVerification from "@/pages/EmailVerification";
import PasswordReset from "@/pages/PasswordReset";
import Onboarding from "@/pages/Onboarding";
import CreateClass from "@/pages/CreateClass";
import TeacherProfile from "@/pages/TeacherProfile";
import EditCourse from "@/pages/EditCourse";
import UserDashboard from "@/pages/UserDashboard";
import Payment from "@/pages/Payment";
import PaymentFailed from "@/pages/PaymentFailed";
import PaymentReceipt from "@/pages/PaymentReceipt";
import BookingConfirmation from "@/pages/BookingConfirmation";
import AuthGuard from "@/components/auth/AuthGuard";

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
    element: (
      <AuthGuard>
        <Dashboard />
      </AuthGuard>
    ),
  },
  {
    path: "/student-dashboard/*",
    element: (
      <AuthGuard>
        <UserDashboard />
      </AuthGuard>
    ),
  },
  {
    path: "/edit-course/:id",
    element: (
      <AuthGuard>
        <EditCourse />
      </AuthGuard>
    ),
  },
  {
    path: "/booking-confirmation",
    element: (
      <AuthGuard>
        <BookingConfirmation />
      </AuthGuard>
    ),
  },
  {
    path: "/payment",
    element: (
      <AuthGuard>
        <Payment />
      </AuthGuard>
    ),
  },
  {
    path: "/payment-receipt",
    element: (
      <AuthGuard>
        <PaymentReceipt />
      </AuthGuard>
    ),
  },
  {
    path: "/payment-failed",
    element: (
      <AuthGuard>
        <PaymentFailed />
      </AuthGuard>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
