
import { format } from "date-fns";
import { Post } from "@/types/community";
import PostVoting from "./PostVoting";

interface PostContentProps {
  post: Post;
}

const PostContent = ({ post }: PostContentProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-left">{post.title}</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Posted by {post.author_id}</span>
          <span>•</span>
          <span>{format(new Date(post.created_at), 'PPp')}</span>
        </div>
      </div>

      <div className="flex gap-4">
        <PostVoting votes={post.votes} />
        <div className="flex-1">
          <p className="whitespace-pre-wrap text-left">{post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default PostContent;
