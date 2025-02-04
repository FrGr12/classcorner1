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
import Resources from "@/pages/Resources";
import Community from "@/pages/Community";
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
import TeacherReviews from "@/components/teach/dashboard/TeacherReviews";
import TeacherPromotions from "@/components/teach/dashboard/TeacherPromotions";
import TeacherWaitlist from "@/components/teach/dashboard/TeacherWaitlist";
import PaymentHistory from "@/components/teach/dashboard/payments/PaymentHistory";
import TeacherPremium from "@/components/teach/dashboard/TeacherPremium";
import TeacherLearningHub from "@/components/teach/dashboard/learning-hub/TeacherLearningHub";
import TeacherMessages from "@/components/teach/dashboard/TeacherMessages";
import TeacherSettings from "@/components/teach/dashboard/TeacherSettings";
import CreateClass from "@/components/teach/CreateClass";
import EditClass from "@/components/teach/EditClass";

// Import user dashboard components
import UserDashboardOverview from "@/components/user-dashboard/UserDashboardOverview";
import UserMessages from "@/components/user-dashboard/UserMessages";
import UserBookings from "@/components/user-dashboard/UserBookings";
import UserNotifications from "@/components/user-dashboard/UserNotifications";
import UserMatches from "@/components/user-dashboard/UserMatches";
import UserSavedClasses from "@/components/user-dashboard/UserSavedClasses";
import UserProfile from "@/components/user-dashboard/UserProfile";
import UserReviews from "@/components/user-dashboard/UserReviews";
import UserPreferences from "@/components/preferences/UserPreferences";

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
    path: "/dashboard/*",
    element: <UserDashboard />,
    children: [
      { path: "", element: <UserDashboardOverview /> },
      { path: "messages", element: <UserMessages /> },
      { path: "bookings", element: <UserBookings /> },
      { path: "notifications", element: <UserNotifications /> },
      { path: "matches", element: <UserMatches /> },
      { path: "saved", element: <UserSavedClasses /> },
      { path: "profile", element: <UserProfile /> },
      { path: "preferences", element: <UserPreferences /> },
      { path: "reviews", element: <UserReviews /> },
    ],
  },
  {
    path: "/teach/*",
    element: <TeacherDashboard />,
    children: [
      { path: "", element: <TeacherOverview /> },
      { path: "profile", element: <TeacherProfile /> },
      { path: "crm", element: <TeacherCRM /> },
      { path: "messages", element: <TeacherMessages /> },
      { path: "bookings/*", 
        element: <TeacherBookings />,
        children: [
          { path: "waitlist", element: <TeacherWaitlist /> }
        ]
      },
      { path: "classes", element: <TeacherClasses /> },
      { path: "classes/new", element: <CreateClass /> },
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
    path: "/about",
    element: <About />,
  },
  {
    path: "/resources",
    element: <Resources />,
  },
  {
    path: "/community",
    element: <Community />,
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