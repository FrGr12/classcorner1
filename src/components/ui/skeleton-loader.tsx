
import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular" | "button" | "card";
  width?: number | string;
  height?: number | string;
  animation?: "pulse" | "wave" | "none";
}

const Skeleton = ({
  variant = "rectangular",
  width,
  height,
  animation = "pulse",
  className,
  ...props
}: SkeletonProps) => {
  const animationClass = animation === "pulse" 
    ? "animate-pulse" 
    : animation === "wave" 
      ? "animate-skeleton-wave" 
      : "";
  
  const baseClasses = "bg-neutral-200";
  
  const variantClasses = {
    text: "h-4 rounded w-full",
    circular: "rounded-full",
    rectangular: "rounded",
    button: "rounded-md",
    card: "rounded-xl",
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
      {...props}
    >
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <Skeleton 
            key={index} 
            variant="text" 
            height={height} 
          />
        ))}
    </div>
  );
};

// Skeleton for cards
export const CardSkeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div 
    className={cn("space-y-4 p-4 border rounded-xl", className)} 
    {...props}
  >
    <Skeleton variant="rectangular" height={200} />
    <Skeleton variant="text" height={24} width="70%" />
    <Skeleton variant="text" height={16} />
    <Skeleton variant="text" height={16} />
    <div className="flex gap-2">
      <Skeleton variant="button" height={36} width={100} />
      <Skeleton variant="button" height={36} width={100} />
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
        />
      ))}
  </div>
);

export default Skeleton;
