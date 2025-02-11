
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
    element: <Browse />,
  },
  {
    path: "/class/:category/:id",
    element: <ClassDetails />,
  },
  {
    path: "/dashboard/*",
    element: <Dashboard />,
  },
  {
    path: "/edit-course/:id",
    element: <EditCourse />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
