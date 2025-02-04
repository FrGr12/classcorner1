
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";
import { useMemo } from "react";
import { useToast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import ClassCardHeader from "./card/ClassCardHeader";
import ClassDetails from "./card/ClassDetails";
import ParticipantsTable from "./ParticipantsTable";
import WaitlistTable from "./WaitlistTable";
import ClassActions from "./card/ClassActions";
import DiscountsList from "./discounts/DiscountsList";
import BoostStats from "./card/BoostStats";

interface ClassCardProps {
  classItem: any;
  onAction: (action: string, classId: number) => void;
}

const ClassCard = ({ classItem, onAction }: ClassCardProps) => {
  const { toast } = useToast();
  const participants = classItem.participants || [];
  const waitlistEntries = classItem.waitlist || [];

  const occupancyRate = useMemo(() => {
    if (!classItem.maxParticipants) return 0;
    return Math.round((participants.length / classItem.maxParticipants) * 100);
  }, [participants.length, classItem.maxParticipants]);

  const handlePromoteFromWaitlist = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('waitlist_entries')
        .update({ 
          status: 'promoted',
          notification_sent_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .eq('course_id', classItem.id);

      if (error) throw error;
      toast.success("Participant promoted from waitlist");
    } catch (error) {
      toast.error("Failed to promote participant");
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <ClassCardHeader
        title={classItem.title}
        city={classItem.city}
        onAction={onAction}
        classId={classItem.id}
        status={classItem.status}
      />
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ClassDetails
            date={classItem.date}
            duration={classItem.duration}
            price={classItem.price}
            participantsCount={participants.length}
            maxParticipants={classItem.maxParticipants}
          />
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Class Capacity</span>
              <Badge variant={occupancyRate >= 90 ? "destructive" : occupancyRate >= 70 ? "warning" : "success"}>
                {occupancyRate}%
              </Badge>
            </div>
            <Progress value={occupancyRate} className="h-2" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">Participants</h3>
              <ParticipantsTable 
                participants={participants}
                onStatusUpdate={() => {}} // Implement status update handler
              />
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">Waitlist</h3>
              <WaitlistTable 
                entries={waitlistEntries}
                maxSize={classItem.max_waitlist_size}
                onPromote={handlePromoteFromWaitlist}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">Active Discounts</h3>
              <DiscountsList courseId={classItem.id} />
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">Promotion Stats</h3>
              <BoostStats courseId={classItem.id} />
            </div>

            <ClassActions 
              classId={classItem.id} 
              category={classItem.category}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassCard;
