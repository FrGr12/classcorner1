
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import CreateClassHeader from "@/components/teach/create-class/CreateClassHeader";
import CreateClassForm from "@/components/teach/course-form/CreateClassForm";

const CreateClass = () => {
  const [draftCount, setDraftCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchDraftCount = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      const { count } = await supabase
        .from('courses')
        .select('*', { count: 'exact', head: true })
        .eq('instructor_id', userData.user.id)
        .eq('status', 'draft');

      if (count !== null) {
        setDraftCount(count);
      }
    };

    fetchDraftCount();
  }, []);

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
