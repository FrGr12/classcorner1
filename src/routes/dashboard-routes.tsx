
import { RouteObject } from "react-router-dom";
import StudentDashboardLayout from "@/layouts/StudentDashboardLayout";
import UserBookings from "@/components/user-dashboard/UserBookings";
import UserSavedClasses from "@/components/user-dashboard/UserSavedClasses";
import UserWaitlist from "@/components/user-dashboard/UserWaitlist";
import UserPayments from "@/components/user-dashboard/UserPayments";
import UserPaymentMethods from "@/components/user-dashboard/UserPaymentMethods";
import AuthGuard from "@/components/auth/AuthGuard";

export const dashboardRoutes: RouteObject[] = [
  {
    path: "/student-dashboard",
    element: (
      <AuthGuard>
        <StudentDashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <UserBookings />,
      },
      {
        path: "bookings",
        element: <UserBookings />,
      },
      {
        path: "saved",
        element: <UserSavedClasses />,
      },
      {
        path: "payments",
        element: <UserPayments />
      },
      {
        path: "payment-methods",
        element: <UserPaymentMethods />
      },
      {
        path: "waitlist",
        element: <UserWaitlist />
      },
    ],
  },
];

