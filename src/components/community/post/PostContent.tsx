
import { Post } from "@/types/community";
import { format } from "date-fns";
import { VotingButtons } from "./VotingButtons";

interface PostContentProps {
  post: Post;
  userVote: number;
  onVoteChange: (value: number) => void;
}

export function PostContent({ post, userVote, onVoteChange }: PostContentProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Posted by {post.author_id}</span>
          <span>•</span>
          <span>{format(new Date(post.created_at), 'PPp')}</span>
        </div>
      </div>

      <div className="flex gap-4">
        <VotingButtons
          votes={post.votes}
          userVote={userVote}
          onVote={onVoteChange}
        />
        <div className="flex-1">
          <p className="whitespace-pre-wrap">{post.content}</p>
        </div>
      </div>
    </div>
  );
}
