
import { ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  // Temporarily bypassing all auth checks - return children directly
  return <>{children}</>;
};

export default AuthGuard;
