import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface FormWrapperProps {
  title: string;
  description: string;
  children: ReactNode;
}

const FormWrapper = ({ title, description, children }: FormWrapperProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default FormWrapper;