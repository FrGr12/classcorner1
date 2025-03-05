
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import CommentForm from "./CommentForm";
import CommentsList from "./CommentsList";
import { Comment } from "@/types/community";

interface CommentsSectionProps {
  postId: number;
  comments: Comment[] | undefined;
  isLoading: boolean;
  session: any;
  refetchComments: () => void;
}

const CommentsSection = ({ 
  postId, 
  comments, 
  isLoading, 
  session,
  refetchComments
}: CommentsSectionProps) => {
  const queryClient = useQueryClient();
  
  const createCommentMutation = useMutation({
    mutationFn: async (commentContent: string) => {
      const { data, error } = await supabase
        .from('post_comments')
        .insert([
          {
            post_id: postId,
            content: commentContent,
            author_id: session?.user?.id
          }
        ]);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post-comments', postId.toString()] });
      toast.success("Comment added successfully");
      refetchComments();
    },
    onError: (error) => {
      toast.error("Failed to add comment: " + (error as Error).message);
    }
  });

  const handleSubmitComment = async (content: string) => {
    if (!session) {
      toast.error("Please log in to comment");
      return;
    }
    await createCommentMutation.mutateAsync(content);
  };

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4 text-left">Comments</h2>
      
      <CommentForm 
        onSubmit={handleSubmitComment} 
        isLoggedIn={!!session} 
      />
      
      <CommentsList comments={comments} isLoading={isLoading} />
    </div>
  );
};

export default CommentsSection;
