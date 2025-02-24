
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
import Community from "@/pages/Community";
import PostDetail from "@/components/community/PostDetail";
import Groups from "@/pages/Groups";
import AuthGuard from "@/components/auth/AuthGuard";
import ErrorBoundary from "@/components/error/ErrorBoundary";
import GroupPage from "@/pages/GroupPage";
import About from "@/pages/About";
import TeacherContacts from "@/pages/TeacherContacts";
import TeacherInbox from "@/pages/TeacherInbox";
import ContactManagement from "@/pages/ContactManagement";

const router = createBrowserRouter([
  // Public routes
  {
    path: "/",
    element: <Index />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/browse",
    element: (
      <ErrorBoundary>
        <Browse />
      </ErrorBoundary>
    ),
  },
  {
    path: "/class/:category/:id",
    element: (
      <ErrorBoundary>
        <ClassDetails />
      </ErrorBoundary>
    ),
  },

  // Authentication routes
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

  // Payment routes
  {
    path: "/payment",
    element: (
      <AuthGuard>
        <ErrorBoundary>
          <Payment />
        </ErrorBoundary>
      </AuthGuard>
    ),
  },
  {
    path: "/payment-receipt",
    element: (
      <AuthGuard>
        <ErrorBoundary>
          <PaymentReceipt />
        </ErrorBoundary>
      </AuthGuard>
    ),
  },
  {
    path: "/payment-failed",
    element: (
      <AuthGuard>
        <ErrorBoundary>
          <PaymentFailed />
        </ErrorBoundary>
      </AuthGuard>
    ),
  },
  {
    path: "/booking-confirmation",
    element: (
      <ErrorBoundary>
        <BookingConfirmation />
      </ErrorBoundary>
    ),
  },

  // Community routes
  {
    path: "/community",
    element: (
      <ErrorBoundary>
        <Community />
      </ErrorBoundary>
    ),
  },
  {
    path: "/community/post/:id",
    element: (
      <ErrorBoundary>
        <PostDetail />
      </ErrorBoundary>
    ),
  },
  {
    path: "/community/groups",
    element: (
      <ErrorBoundary>
        <Groups />
      </ErrorBoundary>
    ),
  },
  {
    path: "/community/groups/:id",
    element: (
      <ErrorBoundary>
        <GroupPage />
      </ErrorBoundary>
    ),
  },
  {
    path: "/community/topic/:topic",
    element: (
      <ErrorBoundary>
        <Community />
      </ErrorBoundary>
    ),
  },
  {
    path: "/community/category/:category",
    element: (
      <ErrorBoundary>
        <Community />
      </ErrorBoundary>
    ),
  },
  {
    path: "/community/resource/:resource",
    element: (
      <ErrorBoundary>
        <Community />
      </ErrorBoundary>
    ),
  },

  // Catch-all route
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
