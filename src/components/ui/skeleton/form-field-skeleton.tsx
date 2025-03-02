
import React from "react";
import { cn } from "@/lib/utils";
import Skeleton from "./skeleton";

export const FormFieldSkeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div 
    className={cn("space-y-2", className)} 
    role="status"
    aria-busy="true"
    aria-label="Loading form field"
    {...props}
  >
    <Skeleton variant="text" height={16} width="40%" animation="shimmer" />
    <Skeleton variant="input" height={40} animation="shimmer" />
  </div>
);
