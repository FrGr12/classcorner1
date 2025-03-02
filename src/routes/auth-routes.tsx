
import { RouteObject } from "react-router-dom";
import Auth from "@/pages/Auth";
import EmailVerification from "@/pages/EmailVerification";
import PasswordReset from "@/pages/PasswordReset";
import Onboarding from "@/pages/Onboarding";
import Messages from "@/pages/Messages";
import AuthGuard from "@/components/auth/AuthGuard";

export const authRoutes: RouteObject[] = [
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
  // Messages is now protected by AuthGuard
  {
    path: "/messages",
    element: (
      <AuthGuard>
        <Messages />
      </AuthGuard>
    ),
  },
];
