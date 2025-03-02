
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonList, SkeletonProps } from "@/components/ui/skeleton-loader";

export const MessagesSkeleton = () => (
  <div className="p-4 space-y-2">
    {Array(5).fill(0).map((_, i) => (
      <div key={i} className="p-4 border rounded-lg">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-[30%] rounded" />
              <Skeleton className="h-3 w-[20%] rounded" />
            </div>
            <Skeleton className="h-4 w-[80%] rounded mt-1" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const MessageDetailSkeleton = () => (
  <div className="p-6">
    <div className="flex items-center gap-4 mb-6">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div>
        <Skeleton className="h-5 w-[120px] rounded" />
        <Skeleton className="h-4 w-[180px] rounded mt-1" />
      </div>
    </div>
    <div className="prose max-w-none">
      <div className="bg-muted p-4 rounded-lg">
        <SkeletonList count={3} height={16} />
      </div>
    </div>
    <div className="mt-6">
      <Skeleton className="min-h-[100px] w-full rounded" />
      <div className="flex justify-end mt-2">
        <Skeleton className="h-9 w-[100px] rounded" />
      </div>
    </div>
  </div>
);
