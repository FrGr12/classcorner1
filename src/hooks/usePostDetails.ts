
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Post, Comment } from "@/types/community";

export function usePostDetails(postId: string | undefined) {
  const [session, setSession] = useState<any>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);

  const { 
    data: post, 
    isLoading: postLoading, 
    error: postError 
  } = useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      if (!postId) throw new Error("Post ID is required");
      
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', parseInt(postId, 10))
        .single();
      
      if (error) throw error;
      return data as Post;
    },
    enabled: !!postId
  });

  const { 
    data: comments, 
    isLoading: commentsLoading,
    refetch: refetchComments
  } = useQuery({
    queryKey: ['post-comments', postId],
    queryFn: async () => {
      if (!postId) throw new Error("Post ID is required");
      
      const { data, error } = await supabase
        .from('post_comments')
        .select('*')
        .eq('post_id', parseInt(postId, 10))
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as Comment[];
    },
    enabled: !!postId
  });

  return {
    post,
    comments,
    postLoading,
    commentsLoading,
    postError,
    session,
    refetchComments
  };
}
