
import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import Index from "@/pages/Index";
import Browse from "@/pages/Browse";
import ClassDetails from "@/pages/ClassDetails";
import UserDashboard from "@/pages/UserDashboard";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import ErrorPage from "@/pages/ErrorPage";
import Auth from "@/pages/Auth";
import EmailVerification from "@/pages/EmailVerification";
import PasswordReset from "@/pages/PasswordReset";
import Onboarding from "@/pages/Onboarding";
import TeacherClasses from "@/components/teach/dashboard/TeacherClasses";
import TeacherProfile from "@/components/teach/dashboard/TeacherProfile";
import TeacherCRM from "@/components/teach/dashboard/TeacherCRM";
import TeacherBookings from "@/components/teach/dashboard/TeacherBookings";
import TeacherAnalytics from "@/components/teach/dashboard/TeacherAnalytics";
import TeacherReviews from "@/components/teach/dashboard/TeacherReviews";
import TeacherOverview from "@/components/teach/dashboard/TeacherOverview";
import EditClass from "@/components/teach/EditClass";
import CourseForm from "@/components/teach/CourseForm";
import UserDashboardOverview from "@/components/user-dashboard/UserDashboardOverview";
import LoadingState from "@/components/user-dashboard/LoadingState";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingState />}>
        <Index />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth",
    element: (
      <Suspense fallback={<LoadingState />}>
        <Auth />
      </Suspense>
    ),
  },
  {
    path: "/email-verification",
    element: (
      <Suspense fallback={<LoadingState />}>
        <EmailVerification />
      </Suspense>
    ),
  },
  {
    path: "/password-reset",
    element: (
      <Suspense fallback={<LoadingState />}>
        <PasswordReset />
      </Suspense>
    ),
  },
  {
    path: "/onboarding",
    element: (
      <Suspense fallback={<LoadingState />}>
        <Onboarding />
      </Suspense>
    ),
  },
  {
    path: "/browse",
    element: (
      <Suspense fallback={<LoadingState />}>
        <Browse />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/class/:category/:id",
    element: (
      <Suspense fallback={<LoadingState />}>
        <ClassDetails />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard/*",
    element: (
      <Suspense fallback={<LoadingState />}>
        <Dashboard />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      { 
        path: "", 
        element: (
          <Suspense fallback={<LoadingState />}>
            <TeacherOverview />
          </Suspense>
        ),
      },
      { 
        path: "create-class", 
        element: (
          <Suspense fallback={<LoadingState />}>
            <CourseForm />
          </Suspense>
        ),
      },
      { 
        path: "profile", 
        element: (
          <Suspense fallback={<LoadingState />}>
            <TeacherProfile />
          </Suspense>
        ),
      },
      { 
        path: "crm", 
        element: (
          <Suspense fallback={<LoadingState />}>
            <TeacherCRM />
          </Suspense>
        ),
      },
      { 
        path: "bookings", 
        element: (
          <Suspense fallback={<LoadingState />}>
            <TeacherBookings />
          </Suspense>
        ),
      },
      { 
        path: "classes", 
        element: (
          <Suspense fallback={<LoadingState />}>
            <TeacherClasses />
          </Suspense>
        ),
      },
      { 
        path: "classes/:id/edit", 
        element: (
          <Suspense fallback={<LoadingState />}>
            <EditClass />
          </Suspense>
        ),
      },
      { 
        path: "analytics", 
        element: (
          <Suspense fallback={<LoadingState />}>
            <TeacherAnalytics />
          </Suspense>
        ),
      },
      { 
        path: "reviews", 
        element: (
          <Suspense fallback={<LoadingState />}>
            <TeacherReviews />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/user-dashboard/*",
    element: (
      <Suspense fallback={<LoadingState />}>
        <UserDashboard />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      { 
        path: "", 
        element: (
          <Suspense fallback={<LoadingState />}>
            <UserDashboardOverview />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
