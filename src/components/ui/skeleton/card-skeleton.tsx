
import React from "react";
import { cn } from "@/lib/utils";
import Skeleton from "./skeleton";

export const CardSkeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div 
    className={cn("space-y-4 p-4 border rounded-xl", className)} 
    role="status"
    aria-busy="true"
    aria-label="Loading card"
    {...props}
  >
    <Skeleton variant="rectangular" height={200} animation="shimmer" />
    <Skeleton variant="text" height={24} width="70%" animation="shimmer" />
    <Skeleton variant="text" height={16} animation="shimmer" />
    <Skeleton variant="text" height={16} animation="shimmer" />
    <div className="flex gap-2">
      <Skeleton variant="button" height={36} width={100} animation="shimmer" />
      <Skeleton variant="button" height={36} width={100} animation="shimmer" />
    </div>
  </div>
);
