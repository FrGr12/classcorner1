
import React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

export const DashboardSkeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div 
    className={cn("space-y-6", className)} 
    role="status"
    aria-busy="true"
    aria-label="Loading dashboard"
    {...props}
  >
    <div className="flex justify-between items-center">
      <Skeleton variant="text" height={32} width={200} animation="shimmer" />
      <div className="flex gap-2">
        <Skeleton variant="button" height={40} width={100} animation="shimmer" />
        <Skeleton variant="button" height={40} width={100} animation="shimmer" />
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border rounded-xl p-4 space-y-3">
          <Skeleton variant="text" height={24} width="50%" animation="shimmer" />
          <Skeleton variant="text" height={36} width="70%" animation="shimmer" />
        </div>
      ))}
    </div>
    
    <div className="border rounded-xl p-4 space-y-4">
      <Skeleton variant="text" height={28} width="30%" animation="shimmer" />
      <Skeleton variant="chart" height={200} animation="shimmer" />
    </div>
    
    <div className="border rounded-xl p-4 space-y-4">
      <Skeleton variant="text" height={28} width="30%" animation="shimmer" />
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-3 border-b pb-3">
            <Skeleton variant="avatar" height={40} width={40} animation="shimmer" />
            <div className="flex-1">
              <Skeleton variant="text" height={20} width="40%" animation="shimmer" />
              <Skeleton variant="text" height={16} width="60%" className="mt-2" animation="shimmer" />
            </div>
            <Skeleton variant="badge" height={24} width={60} animation="shimmer" />
          </div>
        ))}
      </div>
    </div>
  </div>
);
