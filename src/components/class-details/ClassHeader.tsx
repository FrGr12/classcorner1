
import { Clock, MapPin, Users, Star, Edit, MessageCircle, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClassItem } from "@/types/class";
import { useNavigate } from "react-router-dom";
import { memo } from "react";
import { useClassHeader } from "./class-header/useClassHeader";
import ClassMetadata from "./class-header/ClassMetadata";
import PriceDisplay from "./class-header/PriceDisplay";
import ClassActions from "./class-header/ClassActions";
import PrivateClassDialog from "./class-header/PrivateClassDialog";
import ContactDialog from "./class-header/ContactDialog";
import QuestionDialog from "./class-header/QuestionDialog";

interface ClassHeaderProps {
  classItem: ClassItem;
  onBooking: () => void;
}

const ClassHeader = memo(({
  classItem,
  onBooking
}: ClassHeaderProps) => {
  const {
    isInstructor,
    isMessageOpen,
    setIsMessageOpen,
    isContactDialogOpen,
    setIsContactDialogOpen,
    isQuestionDialogOpen,
    setIsQuestionDialogOpen,
    isFollowing,
    isLoading,
    handlePrivateRequest,
    handleFollow,
    handleAskQuestion,
    getParticipantRange,
    scrollToReviews
  } = useClassHeader(classItem);

  return (
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
      <ClassMetadata 
        classItem={classItem} 
        onReviewsClick={scrollToReviews}
        participantRange={getParticipantRange()}
      />

      <div className="space-y-4">
        <PriceDisplay price={classItem.price} />
        
        <ClassActions 
          classItem={classItem}
          isInstructor={isInstructor}
          isFollowing={isFollowing}
          isLoading={isLoading}
          onBooking={onBooking}
          onRequestPrivate={() => setIsMessageOpen(true)}
          onContact={() => setIsContactDialogOpen(true)}
          onFollow={handleFollow}
          onAskQuestion={() => setIsQuestionDialogOpen(true)}
        />
      </div>

      <PrivateClassDialog 
        isOpen={isMessageOpen}
        isLoading={isLoading}
        onClose={() => setIsMessageOpen(false)}
        onSubmit={handlePrivateRequest}
      />

      <ContactDialog 
        isOpen={isContactDialogOpen}
        onClose={() => setIsContactDialogOpen(false)}
        classItem={classItem}
      />

      <QuestionDialog 
        isOpen={isQuestionDialogOpen}
        isLoading={isLoading}
        onClose={() => setIsQuestionDialogOpen(false)}
        onSubmit={handleAskQuestion}
      />
    </div>
  );
});

// Add display name for debugging purposes
ClassHeader.displayName = 'ClassHeader';
export default ClassHeader;
