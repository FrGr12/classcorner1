
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUp, MessageCircle, Bookmark } from "lucide-react";

interface PostTag {
  name: string;
  color: string;
}

interface PostCardProps {
  post: {
    id: number;
    title: string;
    content: string;
    author: string;
    votes: number;
    comments: number;
    tags: PostTag[];
  };
  onPostClick: (id: number) => void;
  onTagClick: (tagName: string) => void;
}

export function PostCard({ post, onPostClick, onTagClick }: PostCardProps) {
  return (
    <Card 
      className="hover:bg-accent/5 transition-colors cursor-pointer"
      onClick={() => onPostClick(post.id)}
    >
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="flex flex-col items-center gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">{post.votes}</span>
          </div>
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold hover:text-accent-purple">
              {post.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge 
                  key={tag.name} 
                  className={`${tag.color} hover:opacity-90 cursor-pointer transition-opacity`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onTagClick(tag.name);
                  }}
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              {post.content}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="text-xs">Posted by {post.author}</span>
              <span>•</span>
              <button 
                className="flex items-center gap-1 hover:text-accent-purple"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <MessageCircle className="h-4 w-4" />
                {post.comments} comments
              </button>
              <button 
                className="flex items-center gap-1 hover:text-accent-purple"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Bookmark className="h-4 w-4" />
                Save
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
