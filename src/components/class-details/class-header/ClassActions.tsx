
import { Edit, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClassItem } from "@/types/class";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface ClassActionsProps {
  classItem: ClassItem;
  isInstructor: boolean;
  isFollowing: boolean;
  isLoading: boolean;
  onBooking: () => void;
  onRequestPrivate: () => void;
  onContact: () => void;
  onFollow: () => void;
  onAskQuestion: () => void;
}

const ClassActions = ({
  classItem,
  isInstructor,
  isFollowing,
  isLoading,
  onBooking,
  onRequestPrivate,
  onContact,
  onFollow,
  onAskQuestion
}: ClassActionsProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  if (isInstructor) {
    return (
      <Button 
        size="lg" 
        variant="outline" 
        className="w-full md:w-auto border-accent-purple text-accent-purple hover:bg-accent-purple/10" 
        onClick={() => navigate(`/teach/edit/${classItem.id}`)} 
        aria-label="Edit this course"
      >
        <Edit className="h-4 w-4 mr-2" aria-hidden="true" />
        {t("class.editCourse")}
      </Button>
    );
  }
  
  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        size="lg" 
        className="w-full md:w-auto bg-accent-purple hover:bg-accent-purple/90" 
        onClick={onBooking} 
        aria-label="Book this class now"
      >
        {t("class.bookNow")}
      </Button>
      <Button 
        size="lg" 
        variant="outline" 
        className="w-full md:w-auto border-accent-purple text-accent-purple hover:bg-accent-purple/10" 
        onClick={onRequestPrivate} 
        aria-label="Request a private class"
      >
        {t("class.requestPrivate")}
      </Button>
      <Button 
        variant="outline" 
        className="w-full md:w-auto" 
        onClick={onContact} 
        aria-label="Contact the instructor"
      >
        <Mail className="h-4 w-4 mr-2" aria-hidden="true" />
        {t("class.contact")}
      </Button>
      <Button 
        variant={isFollowing ? "default" : "outline"} 
        className={`w-full md:w-auto ${isFollowing ? 'bg-accent-purple hover:bg-accent-purple/90' : ''}`} 
        onClick={onFollow} 
        disabled={isLoading} 
        aria-label={isFollowing ? "Unfollow instructor" : "Follow instructor"} 
        aria-pressed={isFollowing}
      >
        {isFollowing ? t("class.following") : t("class.follow")}
      </Button>
      <Button 
        variant="outline" 
        className="w-full md:w-auto" 
        onClick={onAskQuestion} 
        data-question-trigger 
        aria-label="Ask a question about this class"
      >
        <MessageCircle className="h-4 w-4 mr-2" aria-hidden="true" />
        {t("class.askQuestion")}
      </Button>
    </div>
  );
};

export default ClassActions;
