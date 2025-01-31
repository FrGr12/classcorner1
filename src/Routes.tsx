import { createBrowserRouter } from "react-router-dom";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Browse from "@/pages/Browse";
import ClassDetails from "@/pages/ClassDetails";
import Payment from "@/pages/Payment";
import PaymentFailed from "@/pages/PaymentFailed";
import BookingSuccess from "@/pages/BookingSuccess";
import UserDashboard from "@/pages/UserDashboard";
import TeacherDashboard from "@/pages/TeacherDashboard";
import Teach from "@/pages/Teach";
import About from "@/pages/About";
import NotFound from "@/pages/NotFound";
import ErrorPage from "@/pages/ErrorPage";
import EmailVerification from "@/pages/EmailVerification";
import PasswordReset from "@/pages/PasswordReset";

// Import teacher dashboard components
import TeacherOverview from "@/components/teach/dashboard/TeacherOverview";
import TeacherProfile from "@/components/teach/dashboard/TeacherProfile";
import TeacherCRM from "@/components/teach/dashboard/TeacherCRM";
import TeacherBookings from "@/components/teach/dashboard/TeacherBookings";
import TeacherClasses from "@/components/teach/dashboard/TeacherClasses";
import TeacherAnalytics from "@/components/teach/dashboard/TeacherAnalytics";
import TeacherMessages from "@/components/teach/dashboard/TeacherMessages";
import TeacherReviews from "@/components/teach/dashboard/TeacherReviews";
import TeacherPromotions from "@/components/teach/dashboard/TeacherPromotions";
import TeacherWaitlist from "@/components/teach/dashboard/TeacherWaitlist";
import PaymentHistory from "@/components/teach/dashboard/payments/PaymentHistory";

export const router = createBrowserRouter([
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
    path: "/class/:category/:id",
    element: <ClassDetails />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/payment/failed",
    element: <PaymentFailed />,
  },
  {
    path: "/booking/success",
    element: <BookingSuccess />,
  },
  {
    path: "/dashboard",
    element: <UserDashboard />,
  },
  {
    path: "/teach/*",
    element: <TeacherDashboard />,
    children: [
      { path: "", element: <TeacherOverview /> },
      { path: "profile", element: <TeacherProfile /> },
      { path: "crm", element: <TeacherCRM /> },
      { path: "bookings", element: <TeacherBookings /> },
      { path: "classes", element: <TeacherClasses /> },
      { path: "analytics", element: <TeacherAnalytics /> },
      { path: "messages", element: <TeacherMessages /> },
      { path: "reviews", element: <TeacherReviews /> },
      { path: "promotions", element: <TeacherPromotions /> },
      { path: "waitlist", element: <TeacherWaitlist /> },
      { path: "payments", element: <PaymentHistory /> },
    ],
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/verify",
    element: <EmailVerification />,
  },
  {
    path: "/reset-password",
    element: <PasswordReset />,
  },
]);