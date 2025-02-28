
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import Auth from "@/pages/Auth";
import Browse from "@/pages/Browse";
import ErrorPage from "@/pages/ErrorPage";
import ClassDetails from "@/pages/ClassDetails";
import Dashboard from "@/pages/Dashboard";
import UserDashboard from "@/pages/UserDashboard";
import BookingConfirmation from "@/pages/BookingConfirmation";
import BookingSuccess from "@/pages/BookingSuccess";
import CreateClass from "@/pages/CreateClass";
import EditCourse from "@/pages/EditCourse";
import DuplicateClass from "@/pages/DuplicateClass";
import Community from "@/pages/Community";
import Teach from "@/pages/Teach";
import InstructorProfile from "@/pages/InstructorProfile";
import About from "@/pages/About";
import Payment from "@/pages/Payment";
import PaymentReceipt from "@/pages/PaymentReceipt";
import PaymentFailed from "@/pages/PaymentFailed";
import Onboarding from "@/pages/Onboarding";
import EmailVerification from "@/pages/EmailVerification";
import PasswordReset from "@/pages/PasswordReset";
import AuthGuard from "@/components/auth/AuthGuard";
import GroupPage from "@/pages/GroupPage";
import Groups from "@/pages/Groups";
import Resources from "@/pages/Resources";

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
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/browse/:category",
    element: <Browse />,
  },
  {
    path: "/class/:category/:id",
    element: <ClassDetails />,
  },
  {
    path: "/booking-confirmation",
    element: <BookingConfirmation />,
  },
  {
    path: "/booking-success",
    element: <BookingSuccess />,
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
    path: "/dashboard/classes/edit/:id",
    element: (
      <AuthGuard>
        <EditCourse />
      </AuthGuard>
    ),
  },
  {
    path: "/dashboard/classes/create",
    element: (
      <AuthGuard>
        <CreateClass />
      </AuthGuard>
    ),
  },
  {
    path: "/dashboard/classes/duplicate/:id",
    element: (
      <AuthGuard>
        <DuplicateClass />
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
    path: "/community",
    element: <Community />,
  },
  {
    path: "/community/category/:category",
    element: <Community />,
  },
  {
    path: "/community/topic/:topic",
    element: <Community />,
  },
  {
    path: "/community/post/:id",
    element: <Community />,
  },
  {
    path: "/community/resources/:resource",
    element: <Community />,
  },
  {
    path: "/community/groups",
    element: <Groups />,
  },
  {
    path: "/community/group/:id",
    element: <GroupPage />,
  },
  {
    path: "/community/resources",
    element: <Resources />,
  },
  {
    path: "/teach",
    element: <Teach />,
  },
  {
    path: "/instructor/:id",
    element: <InstructorProfile />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/payment/receipt",
    element: <PaymentReceipt />,
  },
  {
    path: "/payment/failed",
    element: <PaymentFailed />,
  },
  {
    path: "/onboarding",
    element: (
      <AuthGuard>
        <Onboarding />
      </AuthGuard>
    ),
  },
  {
    path: "/verify-email",
    element: <EmailVerification />,
  },
  {
    path: "/reset-password",
    element: <PasswordReset />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
