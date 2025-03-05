
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUp, MessageCircle, Bookmark, Calendar, User } from "lucide-react";
import { Post } from "@/types/community";
import { format } from "date-fns";

interface PostCardProps {
  post: Post;
  onPostClick: (id: number) => void;
  onTagClick: (tagName: string) => void;
}

export function PostCard({ post, onPostClick, onTagClick }: PostCardProps) {
  return (
    <Card 
      className="hover:bg-accent/5 transition-colors cursor-pointer" 
      onClick={() => onPostClick(post.id)}
    >
      <CardContent className="p-4">
        <div className="flex gap-3">
          <div className="flex flex-col items-center gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={e => {
                e.stopPropagation();
                // Handle vote
              }}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
            <span className="text-xs font-medium">{post.votes}</span>
          </div>

          <div className="flex-1 min-w-0 space-y-1.5">
            <h3 className="font-semibold text-left text-slate-950 line-clamp-2">
              {post.title}
            </h3>

            <div className="flex flex-wrap gap-1.5">
              {post.tags.map(tag => (
                <Badge
                  key={tag}
                  onClick={e => {
                    e.stopPropagation();
                    onTagClick(tag);
                  }}
                  className="hover:opacity-90 cursor-pointer bg-accent-purple text-xs px-2 py-0"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2 text-left">
              {post.content}
            </p>

            <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {post.author_id}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {format(new Date(post.created_at), 'MMM d')}
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <button 
                  className="flex items-center gap-1 hover:text-accent-purple" 
                  onClick={e => {
                    e.stopPropagation();
                  }}
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>Comments</span>
                </button>
                <button 
                  className="flex items-center gap-1 hover:text-accent-purple" 
                  onClick={e => {
                    e.stopPropagation();
                  }}
                >
                  <Bookmark className="h-3.5 w-3.5" />
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
