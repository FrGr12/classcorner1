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
    path: "/teacher/dashboard",
    element: <TeacherDashboard />,
  },
  {
    path: "/teach",
    element: <Teach />,
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