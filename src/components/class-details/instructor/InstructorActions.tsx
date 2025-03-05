import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, UserPlus, UserMinus, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ClassItem } from "@/types/class";
import { useLanguage } from "@/contexts/LanguageContext";

interface InstructorActionsProps {
  classItem: ClassItem;
  instructorId: string;
  onContactClick: () => void;
  onShowQuestion: () => void;
  isFollowing: boolean;
  setIsFollowing: (state: boolean) => void;
}

const InstructorActions = ({ 
  classItem, 
  instructorId,
  onContactClick,
  onShowQuestion, 
  isFollowing,
  setIsFollowing,
}: InstructorActionsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleFollowToggle = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: t("auth.required"),
          description: t("instructor.signInToFollow"),
          variant: "destructive"
        });
        return;
      }

      if (!classItem.instructor_id) {
        toast({
          title: t("message.error"),
          description: t("instructor.idNotFound"),
          variant: "destructive"
        });
        return;
      }

      setIsLoading(true);

      if (isFollowing) {
        const { error } = await supabase
          .from('teacher_follows')
          .delete()
          .eq('student_id', user.id)
          .eq('teacher_id', classItem.instructor_id);

        if (error) throw error;

        toast({
          title: t("instructor.unfollowed"),
          description: t("instructor.unfollowedMessage").replace('{instructor}', classItem.instructor_name)
        });
      } else {
        const { error } = await supabase
          .from('teacher_follows')
          .insert({
            student_id: user.id,
            teacher_id: classItem.instructor_id,
            status: 'active'
          });

        if (error) throw error;

        toast({
          title: t("instructor.following"),
          description: t("instructor.followingMessage").replace('{instructor}', classItem.instructor_name)
        });
      }

      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('Error toggling follow status:', error);
      toast({
        title: t("message.error"),
        description: t("instructor.followError"),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap justify-center sm:justify-start gap-2">
      <Button 
        variant="outline" 
        size="sm"
        className="text-xs sm:text-sm gap-1.5 sm:gap-2 h-8 sm:h-9"
        onClick={onContactClick}
      >
        <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        {t("instructor.contact")}
      </Button>
      <Button 
        variant={isFollowing ? "default" : "outline"}
        size="sm"
        className={`text-xs sm:text-sm gap-1.5 sm:gap-2 h-8 sm:h-9 ${
          isFollowing 
            ? 'bg-accent-purple hover:bg-accent-purple/90' 
            : 'border-accent-purple text-accent-purple hover:bg-accent-purple/10'
        }`}
        onClick={handleFollowToggle}
        disabled={isLoading}
      >
        {isFollowing ? (
          <UserMinus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        ) : (
          <UserPlus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        )}
        {isLoading ? t("message.loading") : isFollowing ? t("instructor.following") : t("instructor.follow")}
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="text-xs sm:text-sm gap-1.5 sm:gap-2 h-8 sm:h-9"
        onClick={onShowQuestion}
      >
        <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        {t("class.askQuestion")}
      </Button>
      <Link to={`/instructor/${instructorId}`}>
        <Button
          variant="outline" 
          size="sm"
          className="text-xs sm:text-sm gap-1.5 sm:gap-2 h-8 sm:h-9"
        >
          {t("instructor.viewProfile")}
        </Button>
      </Link>
    </div>
  );
};

export default InstructorActions;
