
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUp, MessageCircle, Bookmark } from "lucide-react";
import { Post } from "@/types/community";
import { format } from "date-fns";

interface PostCardProps {
  post: Post;
  onPostClick: (id: number) => void;
  onTagClick: (tagName: string) => void;
}

export function PostCard({
  post,
  onPostClick,
  onTagClick
}: PostCardProps) {
  return (
    <Card className="hover:bg-accent/5 transition-colors cursor-pointer" onClick={() => onPostClick(post.id)}>
      <CardContent className="p-3 sm:p-4">
        <div className="flex gap-2 sm:gap-4">
          <div className="flex flex-col items-center gap-1">
            <Button variant="ghost" size="sm" className="h-6 w-6 sm:h-8 sm:w-8 p-0" onClick={e => {
              e.stopPropagation();
              // Handle vote
            }}>
              <ArrowUp className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <span className="text-xs sm:text-sm font-medium">{post.votes}</span>
          </div>
          <div className="flex-1 space-y-1 sm:space-y-2 min-w-0">
            <h3 className="font-semibold text-left text-slate-950 text-sm sm:text-base line-clamp-2">
              {post.title}
            </h3>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {post.tags.map(tag => (
                <Badge 
                  key={tag} 
                  onClick={e => {
                    e.stopPropagation();
                    onTagClick(tag);
                  }} 
                  className="hover:opacity-90 cursor-pointer bg-accent-purple text-xs px-1.5 py-0 h-5"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 text-left">
              {post.content}
            </p>
            <div className="flex items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
              <span className="text-xs">Posted by {post.author_id}</span>
              <span>•</span>
              <span className="text-xs hidden sm:inline">{format(new Date(post.created_at), 'PPp')}</span>
              <span className="text-xs sm:hidden">{format(new Date(post.created_at), 'PP')}</span>
              <span>•</span>
              <button className="flex items-center gap-1 hover:text-accent-purple" onClick={e => {
                e.stopPropagation();
              }}>
                <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Comments</span>
              </button>
              <button className="flex items-center gap-1 hover:text-accent-purple" onClick={e => {
                e.stopPropagation();
              }}>
                <Bookmark className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Save</span>
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
