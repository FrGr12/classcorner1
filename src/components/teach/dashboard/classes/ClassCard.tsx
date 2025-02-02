import { Card, CardContent } from "@/components/ui/card";
import ClassCardHeader from "./card/ClassCardHeader";
import ClassDetails from "./card/ClassDetails";
import CapacityIndicator from "./card/CapacityIndicator";
import ParticipantsTable from "./ParticipantsTable";
import WaitlistTable from "./WaitlistTable";
import ClassActions from "./card/ClassActions";

interface ClassCardProps {
  classItem: any;
  onAction: (action: string, classId: number) => void;
}

const ClassCard = ({ classItem, onAction }: ClassCardProps) => {
  const participants = classItem.participants || [];

  return (
    <Card className="hover:shadow-md transition-shadow">
      <ClassCardHeader
        title={classItem.title}
        city={classItem.city}
        onAction={onAction}
        classId={classItem.id}
      />
      
      <CardContent>
        <div className="space-y-4">
          <ClassDetails
            date={classItem.date}
            duration={classItem.duration}
            price={classItem.price}
            participantsCount={participants.length}
            maxParticipants={classItem.maxParticipants}
          />

          <CapacityIndicator
            participantsCount={participants.length}
            maxParticipants={classItem.maxParticipants}
          />

          <div className="border rounded-lg p-4 space-y-4">
            <ParticipantsTable participants={participants} />
            {classItem.waitlist?.length > 0 && (
              <WaitlistTable entries={classItem.waitlist} />
            )}
          </div>

          <ClassActions classId={classItem.id} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassCard;