
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
  const [commentText, setCommentText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmitComment = async () => {
    if (!commentText.trim()) {
      toast({
        title: "Error",
        description: "Please write a comment first",
        variant: "destructive",
      });
      return;
    }

    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to comment",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // First create the comment
    const { data: insertedComment, error: insertError } = await supabase
      .from('post_comments')
      .insert({
        post_id: postId,
        content: commentText.trim(),
        author_id: user.id
      })
      .select()
      .single();

    if (insertError || !insertedComment) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
        variant: "destructive",
      });
      return;
    }

    // Then fetch the author details
    const { data: authorData, error: authorError } = await supabase
      .from('profiles')
      .select('first_name, last_name')
      .eq('id', user.id)
      .single();

    setIsLoading(false);

    if (authorError || !authorData) {
      toast({
        title: "Error",
        description: "Failed to load author details.",
        variant: "destructive",
      });
      return;
    }

    // Combine the comment data with author details
    const newCommentWithAuthor: Comment = {
      ...insertedComment,
      author: {
        first_name: authorData.first_name,
        last_name: authorData.last_name
      }
    };

    setComments([...comments, newCommentWithAuthor]);
    setCommentText("");
    
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
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
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
