
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import { useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
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

// Mock participants data
const mockParticipants = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    status: "confirmed",
    paymentStatus: "paid",
    attendanceStatus: "present"
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike.c@example.com",
    status: "confirmed",
    paymentStatus: "pending",
    attendanceStatus: "pending"
  },
  {
    id: 3,
    name: "Emma Davis",
    email: "emma.d@example.com",
    status: "pending",
    paymentStatus: "unpaid",
    attendanceStatus: "pending"
  }
];

// Mock waitlist data
const mockWaitlist = [
  {
    id: 1,
    user_id: "1",
    created_at: new Date().toISOString(),
    status: "waiting",
    profile: {
      first_name: "John",
      last_name: "Smith",
      email: "john.s@example.com"
    },
    waitlist_position: 1
  },
  {
    id: 2,
    user_id: "2",
    created_at: new Date().toISOString(),
    status: "waiting",
    profile: {
      first_name: "Lisa",
      last_name: "Wong",
      email: "lisa.w@example.com"
    },
    waitlist_position: 2
  }
];

const ClassCard = ({ classItem, onAction }: ClassCardProps) => {
  const participants = mockParticipants;
  const waitlistEntries = mockWaitlist;

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
      toast({
        description: "Participant promoted from waitlist"
      });
    } catch (error) {
      toast({
        description: "Failed to promote participant"
      });
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <ClassCardHeader
        title={classItem.title}
        city={classItem.city}
        onAction={onAction}
        classId={classItem.id}
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
              <Badge variant={occupancyRate >= 90 ? "destructive" : occupancyRate >= 70 ? "secondary" : "default"}>
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
                onStatusUpdate={() => {}} 
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
