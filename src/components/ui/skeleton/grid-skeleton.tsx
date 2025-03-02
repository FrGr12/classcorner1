
import React from "react";
import { cn } from "@/lib/utils";
import { CardSkeleton } from "./card-skeleton";

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
