
import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular" | "button" | "card" | "avatar" | "badge" | "input" | "media" | "chart";
  width?: number | string;
  height?: number | string;
  animation?: "pulse" | "wave" | "shimmer" | "none";
  className?: string;
}

const Skeleton = ({
  variant = "rectangular",
  width,
  height,
  animation = "pulse",
  className,
  ...props
}: SkeletonProps) => {
  // Determine animation class
  const animationClass = 
    animation === "pulse" 
      ? "animate-pulse" 
      : animation === "wave" 
        ? "animate-skeleton-wave" 
        : animation === "shimmer"
          ? "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent"
          : "";
  
  const baseClasses = "bg-neutral-200 dark:bg-neutral-700";
  
  const variantClasses = {
    text: "h-4 rounded w-full",
    circular: "rounded-full",
    rectangular: "rounded",
    button: "rounded-md",
    card: "rounded-xl",
    avatar: "rounded-full h-10 w-10",
    badge: "h-6 w-16 rounded-full",
    input: "h-10 rounded-md",
    media: "rounded-md h-40 w-full",
    chart: "h-40 rounded-md",
  };

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        animationClass,
        className
      )}
      style={{
        width: width,
        height: height,
      }}
      role="status"
      aria-busy="true"
      aria-label="Loading"
      {...props}
    />
  );
};

// Skeleton group for common UI patterns
interface SkeletonListProps extends React.HTMLAttributes<HTMLDivElement> {
  count: number;
  height?: number | string;
  spacing?: number;
}

export const SkeletonList = ({
  count,
  height = "1rem",
  spacing = 0.5,
  className,
  ...props
}: SkeletonListProps) => {
  return (
    <div 
      className={cn("space-y-2", className)} 
      style={{ gap: `${spacing}rem` }}
      role="status"
      aria-busy="true"
      aria-label="Loading list items"
      {...props}
    >
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <Skeleton 
            key={index} 
            variant="text" 
            height={height}
            animation="shimmer" 
          />
        ))}
    </div>
  );
};

// Skeleton for cards
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

// Table skeleton
export const TableRowSkeleton = ({ 
  columns = 4, 
  className,
  ...props
}: { columns?: number } & React.HTMLAttributes<HTMLDivElement>) => (
  <div 
    className={cn("grid border-b py-3", `grid-cols-${columns}`, className)} 
    role="status"
    aria-busy="true"
    aria-label="Loading table row"
    {...props}
  >
    {Array(columns)
      .fill(0)
      .map((_, index) => (
        <Skeleton 
          key={index} 
          variant="text" 
          width={index === 0 ? "60%" : "80%"} 
          height={20}
          animation="shimmer" 
        />
      ))}
  </div>
);

// Form field skeleton
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

// Profile skeleton
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

// Grid skeleton
export const GridSkeleton = ({ 
  columns = 3, 
  rows = 2, 
  className,
  ...props
}: { columns?: number; rows?: number } & React.HTMLAttributes<HTMLDivElement>) => (
  <div 
    className={cn(
      "grid gap-4",
      columns === 1 ? "grid-cols-1" : 
      columns === 2 ? "grid-cols-1 sm:grid-cols-2" : 
      columns === 3 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" :
      columns === 4 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1",
      className
    )} 
    role="status"
    aria-busy="true"
    aria-label="Loading grid items"
    {...props}
  >
    {Array(columns * rows)
      .fill(0)
      .map((_, index) => (
        <CardSkeleton key={index} />
      ))}
  </div>
);

// Dashboard skeleton
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

export default Skeleton;
