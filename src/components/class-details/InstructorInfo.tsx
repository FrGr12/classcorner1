
import { useState } from "react";
import { Mail, Phone, UserPlus, UserMinus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClassItem } from "@/types/class";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface InstructorInfoProps {
  classItem: ClassItem;
}

const InstructorInfo = ({ classItem }: InstructorInfoProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const checkFollowStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('teacher_follows')
        .select('id')
        .eq('student_id', user.id)
        .eq('teacher_id', classItem.instructor_id)
        .eq('status', 'active')
        .single();

      setIsFollowing(!!data);
    } catch (error) {
      console.error('Error checking follow status:', error);
    }
  };

  const handleFollowToggle = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to follow instructors",
          variant: "destructive"
        });
        return;
      }

      setIsLoading(true);

      if (isFollowing) {
        // Unfollow the instructor
        const { error } = await supabase
          .from('teacher_follows')
          .delete()
          .eq('student_id', user.id)
          .eq('teacher_id', classItem.instructor_id);

        if (error) throw error;

        toast({
          title: "Unfollowed",
          description: `You have unfollowed ${classItem.instructor}`
        });
      } else {
        // Follow the instructor
        const { error } = await supabase
          .from('teacher_follows')
          .insert({
            student_id: user.id,
            teacher_id: classItem.instructor_id,
            status: 'active'
          });

        if (error) throw error;

        toast({
          title: "Following",
          description: `You are now following ${classItem.instructor}`
        });
      }

      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('Error toggling follow status:', error);
      toast({
        title: "Error",
        description: "Failed to update follow status",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Check initial follow status
  useState(() => {
    checkFollowStatus();
  }, [classItem.instructor_id]);

  return (
    <section className="glass-panel rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-left">About the Instructor</h2>
      <div className="flex items-start gap-6">
        <div className="w-24 h-24 bg-neutral-100 rounded-full flex-shrink-0" />
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-medium text-left">{classItem.instructor}</h3>
            <p className="text-neutral-600 text-left">Expert Craftsperson</p>
          </div>
          <p className="text-neutral-600 text-left">
            An experienced instructor with over 10 years of teaching experience, passionate about sharing creative skills
            and helping students discover their artistic potential.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Mail className="h-4 w-4" />
              Email
            </Button>
            <Button variant="outline" className="gap-2">
              <Phone className="h-4 w-4" />
              Call
            </Button>
          </div>
          <Button 
            variant={isFollowing ? "outline" : "default"}
            className={`gap-2 w-full ${isFollowing ? 'text-accent-purple border-accent-purple hover:bg-accent-purple/10' : 'bg-accent-purple hover:bg-accent-purple/90'}`}
            onClick={handleFollowToggle}
            disabled={isLoading}
          >
            {isFollowing ? (
              <UserMinus className="h-4 w-4" />
            ) : (
              <UserPlus className="h-4 w-4" />
            )}
            {isLoading ? "Loading..." : isFollowing ? "Following" : "Follow"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InstructorInfo;
