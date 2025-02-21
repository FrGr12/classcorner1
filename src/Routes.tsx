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
import ContactManagement from "@/pages/ContactManagement";

const router = createBrowserRouter([
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
  {
    path: "/booking-confirmation",
    element: (
      <ErrorBoundary>
        <BookingConfirmation />
      </ErrorBoundary>
    ),
  },
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
    path: "/dashboard",
    element: (
      <AuthGuard>
        <ErrorBoundary>
          <Dashboard />
        </ErrorBoundary>
      </AuthGuard>
    ),
  },
  {
    path: "/dashboard/create-class",
    element: (
      <AuthGuard>
        <ErrorBoundary>
          <CreateClass />
        </ErrorBoundary>
      </AuthGuard>
    ),
  },
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
  {
    path: "/student-dashboard",
    element: (
      <AuthGuard>
        <ErrorBoundary>
          <UserDashboard />
        </ErrorBoundary>
      </AuthGuard>
    ),
  },
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
  {
    path: "/edit-course/:id",
    element: (
      <AuthGuard>
        <ErrorBoundary>
          <EditCourse />
        </ErrorBoundary>
      </AuthGuard>
    ),
  },
  {
    path: "/dashboard/contacts",
    element: (
      <AuthGuard>
        <ErrorBoundary>
          <TeacherContacts />
        </ErrorBoundary>
      </AuthGuard>
    ),
  },
  {
    path: "/dashboard/contacts/tags",
    element: (
      <AuthGuard>
        <ErrorBoundary>
          <ContactManagement />
        </ErrorBoundary>
      </AuthGuard>
    ),
  },
  {
    path: "/dashboard/contacts/add",
    element: (
      <AuthGuard>
        <ErrorBoundary>
          <ContactManagement />
        </ErrorBoundary>
      </AuthGuard>
    ),
  },
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
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
