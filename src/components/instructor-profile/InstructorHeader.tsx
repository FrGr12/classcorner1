
import { useState } from "react";
import { User, MapPin, Star, Heart, HeartOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InstructorProfile } from "@/types/instructor";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface InstructorHeaderProps {
  instructor: InstructorProfile;
}

const InstructorHeader = ({ instructor }: InstructorHeaderProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFollowToggle = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast("Please sign in to follow instructors", {
          description: "Create an account to save your favorite instructors"
        });
        return;
      }

      if (isFollowing) {
        // Unfollow logic
        const { error } = await supabase
          .from('teacher_follows')
          .delete()
          .eq('student_id', user.id)
          .eq('teacher_id', instructor.id);

        if (error) throw error;
        toast.success(`You've unfollowed ${instructor.displayName}`);
      } else {
        // Follow logic
        const { error } = await supabase
          .from('teacher_follows')
          .insert({
            student_id: user.id,
            teacher_id: instructor.id,
            status: 'active'
          });

        if (error) throw error;
        toast.success(`You're now following ${instructor.displayName}`);
      }
      
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('Error toggling follow status:', error);
      toast.error("Failed to update follow status");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="relative">
          {instructor.avatar ? (
            <img 
              src={instructor.avatar} 
              alt={instructor.displayName} 
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-accent-purple/20"
            />
          ) : (
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-accent-purple/10 flex items-center justify-center border-2 border-accent-purple/20">
              <User className="w-12 h-12 sm:w-16 sm:h-16 text-accent-purple/50" />
            </div>
          )}
        </div>
        
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold">{instructor.displayName}</h1>
            {instructor.averageRating && instructor.averageRating > 0 && (
              <div className="flex items-center gap-1 text-sm sm:text-base">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{instructor.averageRating.toFixed(1)}</span>
                <span className="text-neutral-500">({instructor.totalReviews} reviews)</span>
              </div>
            )}
          </div>
          
          <div className="mt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
            {instructor.expertise && instructor.expertise.map((skill, i) => (
              <Badge key={i} variant="outline" className="bg-accent-purple/5 text-accent-purple">
                {skill}
              </Badge>
            ))}
          </div>

          {instructor.location && (
            <div className="mt-3 flex items-center gap-1 text-neutral-600 justify-center sm:justify-start">
              <MapPin className="h-4 w-4" />
              <span>{instructor.location}</span>
            </div>
          )}
          
          <div className="mt-4 flex justify-center sm:justify-start gap-3">
            <Button 
              variant="outline" 
              className={`gap-2 ${isFollowing ? 'bg-accent-purple/10' : ''}`}
              onClick={handleFollowToggle}
              disabled={isLoading}
            >
              {isFollowing ? (
                <>
                  <HeartOff className="h-4 w-4" />
                  Unfollow
                </>
              ) : (
                <>
                  <Heart className="h-4 w-4" />
                  Follow
                </>
              )}
            </Button>
          </div>
        </div>
        
        <div className="hidden lg:flex flex-col items-end gap-2">
          <div className="text-center bg-accent-purple/5 rounded-lg p-3">
            <div className="text-2xl font-bold text-accent-purple">{instructor.totalClasses}</div>
            <div className="text-sm text-neutral-600">Classes</div>
          </div>
          
          <div className="text-center bg-accent-purple/5 rounded-lg p-3">
            <div className="text-2xl font-bold text-accent-purple">{instructor.totalStudents || "—"}</div>
            <div className="text-sm text-neutral-600">Students</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorHeader;
