
import { RouteObject } from "react-router-dom";
import Index from "@/pages/Index";
import Browse from "@/pages/Browse";
import ClassDetails from "@/pages/ClassDetails";
import About from "@/pages/About";
import InstructorProfile from "@/pages/InstructorProfile";
import ErrorPage from "@/pages/ErrorPage";
import ErrorBoundary from "@/components/error/ErrorBoundary";
import BookingConfirmation from "@/pages/BookingConfirmation";

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Index />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/browse",
    element: (
      <ErrorBoundary>
        <Browse />
      </ErrorBoundary>
    ),
  },
  {
    path: "/class/:category/:id",
    element: (
      <ErrorBoundary>
        <ClassDetails />
      </ErrorBoundary>
    ),
  },
  {
    path: "/instructor/:id",
    element: (
      <ErrorBoundary>
        <InstructorProfile />
      </ErrorBoundary>
    ),
  },
  {
    path: "/booking-confirmation",
    element: (
      <ErrorBoundary>
        <BookingConfirmation />
      </ErrorBoundary>
    ),
  },
];
