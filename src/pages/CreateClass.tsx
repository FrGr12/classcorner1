
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import CreateClassHeader from "@/components/teach/create-class/CreateClassHeader";
import CreateClassForm from "@/components/teach/course-form/CreateClassForm";
import { handleError } from "@/utils/errorHandler";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const CreateClass = () => {
  const [draftCount, setDraftCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserAndFetchDrafts = async () => {
      try {
        setIsLoading(true);
        
        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          throw userError;
        }
        
        if (!user) {
          toast({
            title: "Authentication required",
            description: "Please sign in to create classes",
            variant: "destructive"
          });
          navigate("/auth");
          return;
        }
        
        setUserId(user.id);
        
        // Get draft count for the current user
        const { data: drafts, error: draftsError } = await supabase
          .from('courses')
          .select('id')
          .eq('instructor_id', user.id)
          .eq('status', 'draft');
          
        if (draftsError) {
          throw draftsError;
        }
        
        setDraftCount(drafts?.length || 0);
        setIsLoading(false);
      } catch (error) {
        handleError(error, {
          title: "Failed to load drafts",
          description: "Your draft count may be inaccurate. Please try refreshing the page.",
          position: "top-right",
          action: {
            label: "Retry",
            onClick: () => checkUserAndFetchDrafts()
          }
        });
        setIsLoading(false);
      }
    };

    checkUserAndFetchDrafts();
  }, [navigate, toast]);

  if (isLoading) {
    return (
      <div className="space-y-4 sm:space-y-8 max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="space-y-4">
          <Skeleton className="h-10 w-3/5" />
          <Skeleton className="h-6 w-2/5" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-[200px] w-full rounded-xl" />
          <Skeleton className="h-[300px] w-full rounded-xl" />
          <Skeleton className="h-[250px] w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-8 max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
      <CreateClassHeader 
        draftCount={draftCount} 
        isSubmitting={isSubmitting} 
      />
      
      <CreateClassForm 
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
        draftCount={draftCount}
        userId={userId}
      />
    </div>
  );
};

export default CreateClass;
