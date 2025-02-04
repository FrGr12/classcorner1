
import { createBrowserRouter } from "react-router-dom";
import Index from "@/pages/Index";
import Browse from "@/pages/Browse";
import ClassDetails from "@/pages/ClassDetails";
import UserDashboard from "@/pages/UserDashboard";
import TeacherDashboard from "@/components/teach/dashboard/TeacherDashboard";
import NotFound from "@/pages/NotFound";
import ErrorPage from "@/pages/ErrorPage";

// Import existing teacher dashboard components
import CreateClass from "@/components/teach/CreateClass";
import EditClass from "@/components/teach/EditClass";
import TeacherProfile from "@/components/teach/dashboard/TeacherProfile";
import TeacherLearningHub from "@/components/teach/dashboard/learning-hub/TeacherLearningHub";
import TeacherPremium from "@/components/teach/dashboard/TeacherPremium";
import TeacherSettings from "@/components/teach/dashboard/TeacherSettings";
import PaymentHistory from "@/components/teach/dashboard/payments/PaymentHistory";

// Import user dashboard components
import UserDashboardOverview from "@/components/user-dashboard/UserDashboardOverview";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <ErrorPage />,
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
    element: <UserDashboard />,
    children: [
      { path: "", element: <UserDashboardOverview /> },
    ],
  },
  {
    path: "/teach/*",
    element: <TeacherDashboard />,
    children: [
      { path: "profile", element: <TeacherProfile /> },
      { path: "classes/new", element: <CreateClass /> },
      { path: "classes/:id/edit", element: <EditClass /> },
      { path: "payments", element: <PaymentHistory /> },
      { path: "premium", element: <TeacherPremium /> },
      { path: "learning-hub", element: <TeacherLearningHub /> },
      { path: "settings", element: <TeacherSettings /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
