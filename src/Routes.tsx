
import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import Index from "@/pages/Index";
import ClassDetails from "@/pages/ClassDetails";
import NotFound from "@/pages/NotFound";
import ErrorPage from "@/pages/ErrorPage";
import TeacherDashboard from "@/components/teach/dashboard/TeacherDashboard";
import TeacherClasses from "@/components/teach/dashboard/TeacherClasses";
import TeacherProfile from "@/components/teach/dashboard/TeacherProfile";
import TeacherOverview from "@/components/teach/dashboard/TeacherOverview";
import EditClass from "@/components/teach/EditClass";
import CourseForm from "@/components/teach/CourseForm";
import UserDashboard from "@/components/user-dashboard/UserDashboard";
import UserHome from "@/components/user-dashboard/UserHome";
import LoadingState from "@/components/user-dashboard/LoadingState";
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
    path: "/class/:id",
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
        <TeacherDashboard />
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
        path: "classes", 
        element: <TeacherClasses />
      },
      { 
        path: "classes/:id/edit", 
        element: <EditClass />
      }
    ],
  },
  {
    path: "/dashboard/*",
    element: (
      <Suspense fallback={<LoadingState />}>
        <UserDashboard />
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
