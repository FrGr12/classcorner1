
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

interface CommentFormProps {
  onSubmit: (content: string) => Promise<void>;
  isLoggedIn: boolean;
}

const CommentForm = ({ onSubmit, isLoggedIn }: CommentFormProps) => {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(newComment);
      setNewComment("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <Textarea
        placeholder={isLoggedIn ? "Write a comment..." : "Please log in to comment"}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="min-h-[100px]"
        aria-label="Comment text"
      />
      <Button 
        type="submit" 
        className="bg-accent-purple hover:bg-accent-purple/90"
        disabled={isSubmitting || !isLoggedIn}
        aria-disabled={isSubmitting || !isLoggedIn}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Posting...
          </>
        ) : !isLoggedIn ? 'Log in to Comment' : 'Post Comment'}
      </Button>
    </form>
  );
};

export default CommentForm;
