
import { Comment } from "@/types/community";
import { MessageCircle } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingState from "@/components/user-dashboard/LoadingState";

interface CommentsProps {
  comments?: Comment[];
  isLoading: boolean;
}

export function Comments({ comments, isLoading }: CommentsProps) {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <MessageCircle className="h-5 w-5" />
        Comments
      </h2>
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <LoadingState />
        </div>
      ) : comments?.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">
          No comments yet. Be the first to share your thoughts!
        </p>
      ) : (
        <div className="space-y-4">
          {comments?.map((comment) => (
            <div
              key={comment.id}
              className="p-4 border rounded-lg bg-white shadow-sm"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium">
                  {comment.author_id}
                </span>
                <span className="text-sm text-muted-foreground">
                  {format(new Date(comment.created_at), 'PPp')}
                </span>
              </div>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
