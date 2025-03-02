
import React from "react";
import { Skeleton, SkeletonList, SkeletonProps } from "@/components/ui/skeleton-loader";

export const MessagesSkeleton = () => (
  <div className="p-4 space-y-2">
    {Array(5).fill(0).map((_, i) => (
      <div key={i} className="p-4 border rounded-lg">
        <div className="flex items-center gap-3">
          <Skeleton variant="circular" width={32} height={32} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <Skeleton variant="text" width="30%" height={16} />
              <Skeleton variant="text" width="20%" height={12} />
            </div>
            <Skeleton variant="text" width="80%" height={16} />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const MessageDetailSkeleton = () => (
  <div className="p-6">
    <div className="flex items-center gap-4 mb-6">
      <Skeleton variant="circular" width={40} height={40} />
      <div>
        <Skeleton variant="text" width={120} height={20} />
        <Skeleton variant="text" width={180} height={16} />
      </div>
    </div>
    <div className="prose max-w-none">
      <div className="bg-muted p-4 rounded-lg">
        <SkeletonList count={3} height={16} />
      </div>
    </div>
    <div className="mt-6">
      <Skeleton variant="rectangular" className="min-h-[100px] w-full" />
      <div className="flex justify-end mt-2">
        <Skeleton variant="button" width={100} height={36} />
      </div>
    </div>
  </div>
);
