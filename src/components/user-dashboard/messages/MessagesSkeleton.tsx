
import React, { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonList, SkeletonProps } from "@/components/ui/skeleton-loader";

// Memoize the skeleton components since they don't need to re-render frequently
export const MessagesSkeleton = memo(() => (
  <div className="p-4 space-y-2" aria-busy="true" aria-label="Loading messages">
    {Array(5).fill(0).map((_, i) => (
      <div key={i} className="p-4 border rounded-lg" role="presentation">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full" aria-hidden="true" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-[30%] rounded" aria-hidden="true" />
              <Skeleton className="h-3 w-[20%] rounded" aria-hidden="true" />
            </div>
            <Skeleton className="h-4 w-[80%] rounded mt-1" aria-hidden="true" />
          </div>
        </div>
      </div>
    ))}
  </div>
));

export const MessageDetailSkeleton = memo(() => (
  <div className="p-6" aria-busy="true" aria-label="Loading message details">
    <div className="flex items-center gap-4 mb-6">
      <Skeleton className="h-10 w-10 rounded-full" aria-hidden="true" />
      <div>
        <Skeleton className="h-5 w-[120px] rounded" aria-hidden="true" />
        <Skeleton className="h-4 w-[180px] rounded mt-1" aria-hidden="true" />
      </div>
    </div>
    <div className="prose max-w-none">
      <div className="bg-muted p-4 rounded-lg">
        <SkeletonList count={3} height={16} />
      </div>
    </div>
    <div className="mt-6">
      <Skeleton className="min-h-[100px] w-full rounded" aria-hidden="true" />
      <div className="flex justify-end mt-2">
        <Skeleton className="h-9 w-[100px] rounded" aria-hidden="true" />
      </div>
    </div>
  </div>
));

// Add display names for debugging purposes
MessagesSkeleton.displayName = 'MessagesSkeleton';
MessageDetailSkeleton.displayName = 'MessageDetailSkeleton';
