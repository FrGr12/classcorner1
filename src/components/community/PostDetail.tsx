
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorBoundary from "@/components/error/ErrorBoundary";
import { usePostDetails } from "@/hooks/usePostDetails";
import PostContent from "./post/PostContent";
import CommentsSection from "./post/CommentsSection";

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const {
    post,
    comments,
    postLoading,
    commentsLoading,
    postError,
    session,
    refetchComments
  } = usePostDetails(id);

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
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-4 text-left"
          aria-label="Go back"
        >
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
          <>
            <PostContent post={post} />
            
            <CommentsSection
              postId={post.id}
              comments={comments}
              isLoading={commentsLoading}
              session={session}
              refetchComments={refetchComments}
            />
          </>
        ) : null}
      </div>
    </ErrorBoundary>
  );
}
