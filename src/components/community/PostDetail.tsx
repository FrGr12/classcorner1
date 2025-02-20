
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Post, Comment } from "@/types/community";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, ArrowUp, ArrowDown } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorBoundary from "@/components/error/ErrorBoundary";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [userVote, setUserVote] = useState<number>(0);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get current user session
  const [session, setSession] = useState<any>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);

  const { data: post, isLoading: postLoading, error: postError } = useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', parseInt(id || '0', 10))
        .single();
      if (error) throw error;
      return data as Post;
    },
    enabled: !!id
  });

  const { data: comments, isLoading: commentsLoading } = useQuery({
    queryKey: ['post-comments', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('post_comments')
        .select('*')
        .eq('post_id', parseInt(id || '0', 10))
        .order('created_at', { ascending: true });
      if (error) throw error;
      return data as Comment[];
    },
    enabled: !!id
  });

  const createCommentMutation = useMutation({
    mutationFn: async (commentContent: string) => {
      const { data, error } = await supabase
        .from('post_comments')
        .insert([
          {
            post_id: parseInt(id || '0', 10),
            content: commentContent,
            author_id: session?.user?.id
          }
        ]);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post-comments', id] });
      setNewComment("");
      toast.success("Comment added successfully");
    },
    onError: (error) => {
      toast.error("Failed to add comment: " + (error as Error).message);
    }
  });

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      toast.error("Please log in to comment");
      return;
    }
    if (!newComment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }
    setIsSubmitting(true);
    try {
      await createCommentMutation.mutateAsync(newComment);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (postError) {
    return (
      <div className="p-4">
        <p className="text-red-500">Error loading post: {postError.message}</p>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="container mx-auto py-8 px-4">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 text-left">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {postLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : post ? (
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
              <div className="flex flex-col items-center gap-1">
                <Button variant="ghost" size="sm" className={userVote === 1 ? "text-accent-purple" : ""} onClick={() => setUserVote(prev => prev === 1 ? 0 : 1)}>
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">{post.votes}</span>
                <Button variant="ghost" size="sm" className={userVote === -1 ? "text-accent-purple" : ""} onClick={() => setUserVote(prev => prev === -1 ? 0 : -1)}>
                  <ArrowDown className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1">
                <p className="whitespace-pre-wrap text-left">{post.content}</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4 text-left">Comments</h2>
              
              {session && (
                <form onSubmit={handleSubmitComment} className="mb-6 space-y-4">
                  <Textarea
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <Button 
                    type="submit" 
                    className="bg-accent-purple hover:bg-accent-purple/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Posting...' : 'Post Comment'}
                  </Button>
                </form>
              )}

              {commentsLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                </div>
              ) : comments?.length === 0 ? (
                <p className="text-muted-foreground text-left">No comments yet.</p>
              ) : (
                <div className="space-y-4">
                  {comments?.map(comment => (
                    <div key={comment.id} className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium">
                          {comment.author_id}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {format(new Date(comment.created_at), 'PPp')}
                        </span>
                      </div>
                      <p>{comment.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </ErrorBoundary>
  );
}
