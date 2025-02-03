import { Card, CardContent } from "@/components/ui/card";
import ClassCardHeader from "./card/ClassCardHeader";
import ClassDetails from "./card/ClassDetails";
import CapacityIndicator from "./card/CapacityIndicator";
import ParticipantsTable from "./ParticipantsTable";
import WaitlistTable from "./WaitlistTable";
import ClassActions from "./card/ClassActions";
import DiscountsList from "./discounts/DiscountsList";

interface ClassCardProps {
  classItem: any;
  onAction: (action: string, classId: number) => void;
}

const ClassCard = ({ classItem, onAction }: ClassCardProps) => {
  const participants = classItem.participants || [];
  const waitlistEntries = classItem.waitlist || [];

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
            <div>
              <h3 className="font-medium mb-3">Participants & Waitlist</h3>
              <ParticipantsTable participants={participants} />
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Waitlist</h3>
              <WaitlistTable 
                entries={waitlistEntries} 
                maxSize={classItem.max_waitlist_size}
              />
            </div>
          </div>

          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="font-medium">Active Discounts</h3>
            <DiscountsList courseId={classItem.id} />
          </div>

          <ClassActions 
            classId={classItem.id} 
            category={classItem.category}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassCard;