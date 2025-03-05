
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Comment } from "@/types/community";

interface CommentsListProps {
  comments: Comment[] | undefined;
  isLoading: boolean;
}

const CommentsList = ({ comments, isLoading }: CommentsListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (!comments || comments.length === 0) {
    return <p className="text-muted-foreground text-left">No comments yet.</p>;
  }

  return (
    <div className="space-y-4">
      {comments.map(comment => (
        <div key={comment.id} className="p-4 border rounded-lg">
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
  );
};

export default CommentsList;
