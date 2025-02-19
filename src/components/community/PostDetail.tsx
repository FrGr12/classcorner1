
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Post, Comment } from "@/types/community";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorBoundary from "@/components/error/ErrorBoundary";
import { toast } from "sonner";
import LoadingState from "@/components/user-dashboard/LoadingState";
import { PostContent } from "./post/PostContent";
import { Comments } from "./post/Comments";

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [userVote, setUserVote] = useState<number>(0);
  
  // Convert and validate ID with error handling
  const postId = id ? parseInt(id) : null;
  
  const { data: post, isLoading: postLoading, error: postError } = useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      if (!postId || isNaN(postId)) {
        throw new Error("Invalid post ID");
      }

      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId)
        .maybeSingle();
      
      if (error) throw error;
      if (!data) throw new Error("Post not found");
      
      return data as Post;
    },
    enabled: !!postId && !isNaN(postId),
    retry: false,
    meta: {
      onError: (error: Error) => {
        toast.error(error.message || "Failed to load post");
      }
    }
  });

  const { data: comments, isLoading: commentsLoading } = useQuery({
    queryKey: ['post-comments', postId],
    queryFn: async () => {
      if (!postId || isNaN(postId)) {
        throw new Error("Invalid post ID");
      }

      const { data, error } = await supabase
        .from('post_comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as Comment[];
    },
    enabled: !!postId && !isNaN(postId)
  });

  if (!postId || isNaN(postId)) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Invalid Post</h2>
          <p className="text-muted-foreground mb-4">This post doesn't exist or the ID is invalid.</p>
          <Button onClick={() => navigate('/community')}>
            Back to Community
          </Button>
        </div>
      </div>
    );
  }

  if (postError) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Error Loading Post</h2>
          <p className="text-muted-foreground mb-4">
            {postError instanceof Error ? postError.message : "Failed to load post"}
          </p>
          <Button onClick={() => navigate('/community')}>
            Back to Community
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="container mx-auto py-8 px-4">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {postLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-32 w-full" />
            <LoadingState />
          </div>
        ) : post ? (
          <>
            <PostContent
              post={post}
              userVote={userVote}
              onVoteChange={setUserVote}
            />
            <Comments
              comments={comments}
              isLoading={commentsLoading}
            />
          </>
        ) : null}
      </div>
    </ErrorBoundary>
  );
}
