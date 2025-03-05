
import React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

export const ProfileSkeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div 
    className={cn("flex flex-col sm:flex-row items-center sm:items-start gap-6", className)} 
    role="status"
    aria-busy="true"
    aria-label="Loading profile"
    {...props}
  >
    <Skeleton variant="avatar" height={80} width={80} className="shrink-0" animation="shimmer" />
    <div className="space-y-4 w-full">
      <Skeleton variant="text" height={28} width="60%" animation="shimmer" />
      <Skeleton variant="text" height={16} width="40%" animation="shimmer" />
      <div className="flex flex-wrap gap-3">
        <Skeleton variant="badge" height={24} width={80} animation="shimmer" />
        <Skeleton variant="badge" height={24} width={80} animation="shimmer" />
        <Skeleton variant="badge" height={24} width={80} animation="shimmer" />
      </div>
    </div>
  </div>
);
