import { createBrowserRouter } from "react-router-dom";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Browse from "@/pages/Browse";
import ClassDetails from "@/pages/ClassDetails";
import Teach from "@/pages/Teach";
import TeacherDashboard from "@/pages/TeacherDashboard";
import UserDashboard from "@/pages/UserDashboard";
import EmailVerification from "@/pages/EmailVerification";
import EditCourse from "@/pages/EditCourse";
import PasswordReset from "@/pages/PasswordReset";
import NotFound from "@/pages/NotFound";
import ErrorPage from "@/pages/ErrorPage";

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
    path: "/auth/reset-password",
    element: <PasswordReset />,
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
    path: "/teach/new",
    element: <Teach />,
  },
  {
    path: "/teach/edit/:id",
    element: <EditCourse />,
  },
  {
    path: "/teach/dashboard",
    element: <TeacherDashboard />,
  },
  {
    path: "/dashboard",
    element: <UserDashboard />,
  },
  {
    path: "/verify",
    element: <EmailVerification />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);