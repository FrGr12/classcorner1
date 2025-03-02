
import React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

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
