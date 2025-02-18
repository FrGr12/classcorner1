
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Comment {
  id: number;
  content: string;
  author_id: string;
  created_at: string;
  author: {
    first_name: string;
    last_name: string;
  };
}

interface CommentSectionProps {
  postId: number;
  comments: Comment[];
}

export function CommentSection({ postId, comments: initialComments }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmitComment = async () => {
    if (!newComment.trim()) {
      toast({
        title: "Error",
        description: "Please write a comment first",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const { data, error } = await supabase
      .from('post_comments')
      .insert({
        post_id: postId,
        content: newComment.trim(),
      })
      .select('*, author:profiles(first_name, last_name)')
      .single();

    setIsLoading(false);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setComments([...comments, data]);
    setNewComment("");
    
    toast({
      title: "Success",
      description: "Comment posted successfully!",
    });
  };

  return (
    <div className="space-y-4 mt-6">
      <div className="flex items-center gap-2 text-muted-foreground">
        <MessageCircle className="h-5 w-5" />
        <h3 className="font-medium">{comments.length} Comments</h3>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  {comment.author.first_name} {comment.author.last_name}
                </p>
                <p>{comment.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Textarea
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div className="flex justify-end">
          <Button onClick={handleSubmitComment} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Post Comment
          </Button>
        </div>
      </div>
    </div>
  );
}
