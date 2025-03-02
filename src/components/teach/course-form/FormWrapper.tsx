
import { ReactNode } from "react";

interface FormWrapperProps {
  children: ReactNode;
}

export const FormWrapper = ({ children }: FormWrapperProps) => {
  return (
    <div className="w-full">{children}</div>
  );
};
