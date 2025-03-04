
import { ClassItem } from "@/types/class";
import { useInstructorInfo } from "./instructor/useInstructorInfo";
import InstructorProfileHeader from "./instructor/InstructorProfileHeader";
import InstructorActions from "./instructor/InstructorActions";
import InstructorContactDialog from "./instructor/InstructorContactDialog";
import PrivateRequestDialog from "./instructor/PrivateRequestDialog";

interface InstructorInfoProps {
  classItem: ClassItem;
  onShowQuestion: () => void;
}

const InstructorInfo = ({ classItem, onShowQuestion }: InstructorInfoProps) => {
  const {
    isFollowing,
    setIsFollowing,
    isContactDialogOpen,
    setIsContactDialogOpen,
    isMessageOpen,
    setIsMessageOpen,
    instructorId,
    instructorClassification
  } = useInstructorInfo(classItem);

  return (
    <section className="glass-panel rounded-xl p-4 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-left">About the Instructor</h2>
      
      <InstructorProfileHeader 
        classItem={classItem} 
        instructorId={instructorId} 
        classification={instructorClassification}
      />
      
      <div className="mt-4 sm:mt-6">
        <InstructorActions 
          classItem={classItem}
          instructorId={instructorId}
          onContactClick={() => setIsContactDialogOpen(true)}
          onShowQuestion={onShowQuestion}
          isFollowing={isFollowing}
          setIsFollowing={setIsFollowing}
        />
      </div>

      <InstructorContactDialog 
        isOpen={isContactDialogOpen}
        onClose={() => setIsContactDialogOpen(false)}
        classItem={classItem}
      />

      <PrivateRequestDialog 
        isOpen={isMessageOpen}
        onClose={() => setIsMessageOpen(false)}
        classItem={classItem}
      />
    </section>
  );
};

export default InstructorInfo;
