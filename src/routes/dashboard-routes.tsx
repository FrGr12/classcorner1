
import { RouteObject } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import UserDashboard from "@/pages/UserDashboard";
import TeacherOverview from "@/components/teach/dashboard/TeacherOverview";
import TeacherInbox from "@/components/teach/crm/TeacherInbox";
import CreateClass from "@/pages/CreateClass";
import TeacherProfile from "@/pages/TeacherProfile";
import TeacherContacts from "@/pages/TeacherContacts";
import ContactManagement from "@/pages/ContactManagement";
import TeacherClasses from "@/components/teach/dashboard/TeacherClasses";
import TeacherStats from "@/components/teach/dashboard/TeacherStats";
import TeacherReviews from "@/components/teach/dashboard/TeacherReviews";
import TeacherWaitlist from "@/pages/TeacherWaitlist";
import TeacherMessages from "@/components/teach/dashboard/messages/TeacherMessages";
import StudentDashboardLayout from "@/layouts/StudentDashboardLayout";
import UserBookings from "@/components/user-dashboard/UserBookings";
import UserSavedClasses from "@/components/user-dashboard/UserSavedClasses";
import UserWaitlist from "@/components/user-dashboard/UserWaitlist";
import UserPayments from "@/components/user-dashboard/UserPayments";
import UserPaymentMethods from "@/components/user-dashboard/UserPaymentMethods";
import UserDashboardOverview from "@/components/user-dashboard/UserDashboardOverview";
import UserMessages from "@/components/user-dashboard/UserMessages";
import UserPreferencesPage from "@/components/user-dashboard/UserPreferencesPage";
import UserProfile from "@/components/user-dashboard/UserProfile";

export const dashboardRoutes: RouteObject[] = [
  // Teacher Dashboard Routes
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <TeacherOverview />,
      },
      {
        path: "overview",
        element: <TeacherOverview />,
      },
      {
        path: "create-class",
        element: <CreateClass />,
      },
      {
        path: "inbox",
        element: <TeacherInbox />,
      },
      {
        path: "messages",
        element: <TeacherMessages />,
      },
      {
        path: "contacts",
        element: <TeacherContacts />,
      },
      {
        path: "contacts/tags",
        element: <ContactManagement />,
      },
      {
        path: "contacts/add",
        element: <ContactManagement />,
      },
      {
        path: "profile",
        element: <TeacherProfile />,
      },
      {
        path: "classes",
        element: <TeacherClasses />,
      },
      {
        path: "stats",
        element: <TeacherStats />,
      },
      {
        path: "reviews",
        element: <TeacherReviews />,
      },
      {
        path: "waitlist",
        element: <TeacherWaitlist />,
      },
    ],
  },
  
  // Student Dashboard Routes
  {
    path: "/student-dashboard",
    element: <StudentDashboardLayout />,
    children: [
      {
        index: true,
        element: <UserDashboardOverview />,
      },
      {
        path: "bookings",
        element: <UserBookings />,
      },
      {
        path: "messages",
        element: <UserMessages />,
      },
      {
        path: "saved",
        element: <UserSavedClasses />,
      },
      {
        path: "payments",
        element: <UserPayments />,
      },
      {
        path: "payment-methods",
        element: <UserPaymentMethods />,
      },
      {
        path: "waitlist",
        element: <UserWaitlist />,
      },
      {
        path: "preferences",
        element: <UserPreferencesPage />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
    ],
  },
  
  // Legacy User Dashboard Route - redirects to student dashboard
  {
    path: "/user-dashboard",
    element: <UserDashboard />,
  },
];
