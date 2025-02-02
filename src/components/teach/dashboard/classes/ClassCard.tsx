import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  MoreHorizontal, 
  UserPlus, 
  Megaphone,
  BookOpen,
  Expand
} from "lucide-react";
import ParticipantsTable from "./ParticipantsTable";
import BookingRequestsTable from "./BookingRequestsTable";
import WaitlistTable from "./WaitlistTable";

interface ClassCardProps {
  classItem: any;
  onAction: (action: string, classId: number) => void;
}

const ClassCard = ({ classItem, onAction }: ClassCardProps) => {
  const navigate = useNavigate();
  const participants = classItem.participants || [];

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div>
          <CardTitle className="text-xl">{classItem.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{classItem.city}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onAction("edit", classItem.id)}>
              Edit Class
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction("duplicate", classItem.id)}>
              Duplicate Class
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction("cancel", classItem.id)}>
              Cancel Class
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Date & Time</p>
              <p className="font-medium">
                {new Date(`${classItem.date} ${classItem.time}`).toLocaleString()}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="font-medium">{classItem.duration}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Price</p>
              <p className="font-medium">${classItem.price}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Capacity</p>
              <p className="font-medium">
                {classItem.currentParticipants}/{classItem.maxParticipants}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Class Capacity</span>
              <span>
                {Math.round(
                  (classItem.currentParticipants / classItem.maxParticipants) * 100
                )}
                %
              </span>
            </div>
            <Progress
              value={
                (classItem.currentParticipants / classItem.maxParticipants) * 100
              }
            />
          </div>

          <div className="space-y-4">
            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Bookings & Requests
              </h3>
              <div className="space-y-4">
                <ParticipantsTable participants={participants} />
                {classItem.bookingRequests?.length > 0 && (
                  <BookingRequestsTable requests={classItem.bookingRequests} />
                )}
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full"
                  onClick={() => navigate(`/teach/classes/${classItem.id}/bookings`)}
                >
                  View All Bookings
                </Button>
              </div>
            </div>

            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Waitlist
              </h3>
              <WaitlistTable entries={classItem.waitlist || []} />
            </div>

            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <Megaphone className="h-4 w-4" />
                Promotion Tools
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">Create Discount</Button>
                <Button variant="outline" size="sm">Boost Visibility</Button>
                <Button variant="outline" size="sm">Share Class</Button>
                <Button variant="outline" size="sm">Add Extra Session</Button>
              </div>
            </div>

            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <Expand className="h-4 w-4" />
                Capacity
              </h3>
              <Button variant="outline" size="sm" className="w-full">
                Increase Max Participants
              </Button>
            </div>
          </div>

          <Button
            variant="default"
            className="w-full"
            onClick={() => navigate(`/teach/classes/${classItem.id}`)}
          >
            Manage Class
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassCard;