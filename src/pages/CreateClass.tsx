
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import CreateClassHeader from "@/components/teach/create-class/CreateClassHeader";
import CreateClassForm from "@/components/teach/course-form/CreateClassForm";
import { handleError } from "@/utils/errorHandler";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { Button } from "@/components/ui/button";

const CreateClass = () => {
  const [draftCount, setDraftCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDraftCount = async () => {
      try {
        setIsLoading(true);
        const { data: userData } = await supabase.auth.getUser();
        if (!userData.user) return;

        const { count, error } = await supabase
          .from('courses')
          .select('*', { count: 'exact', head: true })
          .eq('instructor_id', userData.user.id)
          .eq('status', 'draft');

        if (error) throw error;

        if (count !== null) {
          setDraftCount(count);
        }
      } catch (error) {
        handleError(error, {
          title: "Failed to load drafts",
          description: "Your draft count may be inaccurate. Please try refreshing the page.",
          position: "top-right",
          action: {
            label: "Retry",
            onClick: () => fetchDraftCount()
          }
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDraftCount();
  }, []);

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
      />
    </div>
  );
};

export default CreateClass;
