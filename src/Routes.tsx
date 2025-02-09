
import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import Index from "@/pages/Index";
import Browse from "@/pages/Browse";
import ClassDetails from "@/pages/ClassDetails";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import ErrorPage from "@/pages/ErrorPage";
import TeacherClasses from "@/components/teach/dashboard/TeacherClasses";
import TeacherProfile from "@/components/teach/dashboard/TeacherProfile";
import TeacherCRM from "@/components/teach/dashboard/TeacherCRM";
import TeacherAnalytics from "@/components/teach/dashboard/TeacherAnalytics";
import TeacherReviews from "@/components/teach/dashboard/TeacherReviews";
import TeacherOverview from "@/components/teach/dashboard/TeacherOverview";
import EditClass from "@/components/teach/EditClass";
import CourseForm from "@/components/teach/CourseForm";
import UserHome from "@/components/user-dashboard/UserHome";
import LoadingState from "@/components/user-dashboard/LoadingState";
import UserWaitlist from "@/components/user-dashboard/UserWaitlist";
import NotificationCenter from "@/components/notifications/NotificationCenter";
import UserPreferences from "@/components/user-dashboard/UserPreferences";

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
    path: "/class/:category/:id",
    element: (
      <Suspense fallback={<LoadingState />}>
        <ClassDetails />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/teacher-dashboard/*",
    element: (
      <Suspense fallback={<LoadingState />}>
        <Dashboard />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      { 
        path: "", 
        element: <TeacherOverview />
      },
      { 
        path: "create-class", 
        element: <CourseForm />
      },
      { 
        path: "profile", 
        element: <TeacherProfile />
      },
      { 
        path: "crm", 
        element: <TeacherCRM />
      },
      { 
        path: "classes", 
        element: <TeacherClasses />
      },
      { 
        path: "classes/:id/edit", 
        element: <EditClass />
      },
      { 
        path: "analytics", 
        element: <TeacherAnalytics />
      },
      { 
        path: "reviews", 
        element: <TeacherReviews />
      },
    ],
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
        element: <UserHome />,
      },
      {
        path: "notifications",
        element: <NotificationCenter />,
      },
      {
        path: "waitlist",
        element: <UserWaitlist />,
      },
      {
        path: "preferences",
        element: <UserPreferences />,
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
