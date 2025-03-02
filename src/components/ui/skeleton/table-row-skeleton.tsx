
import React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

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
