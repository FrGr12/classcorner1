
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useTeacherFollow = (teacherId: string) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const checkFollowStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('teacher_follows')
        .select('status')
        .eq('student_id', user.id)
        .eq('teacher_id', teacherId)
        .single();

      setIsFollowing(data?.status === 'active');
    } catch (error) {
      console.error('Error checking follow status:', error);
    }
  };

  const toggleFollow = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to follow teachers",
          variant: "destructive",
        });
        return;
      }

      if (isFollowing) {
        await supabase
          .from('teacher_follows')
          .delete()
          .eq('student_id', user.id)
          .eq('teacher_id', teacherId);
        
        setIsFollowing(false);
        toast({
          title: "Unfollowed",
          description: "You will no longer receive notifications about new classes from this teacher",
        });
      } else {
        await supabase
          .from('teacher_follows')
          .insert([
            {
              student_id: user.id,
              teacher_id: teacherId,
              status: 'active'
            }
          ]);
        
        setIsFollowing(true);
        toast({
          title: "Following",
          description: "You'll be notified when this teacher posts new classes",
        });
      }
    } catch (error) {
      console.error('Error toggling follow:', error);
      toast({
        title: "Error",
        description: "Failed to update follow status",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isFollowing,
    isLoading,
    toggleFollow,
    checkFollowStatus
  };
};
