
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingState() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-[250px]" />
      <Skeleton className="h-4 w-[350px]" />
      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-[300px] rounded-md" />
        <Skeleton className="h-[300px] rounded-md" />
      </div>
    </div>
  );
}
