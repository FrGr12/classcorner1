import { useNavigate } from "react-router-dom";
import { format, isValid } from "date-fns";
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
  Edit,
  Users,
  MessageSquare
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
  const occupancyRate = classItem.maxParticipants 
    ? Math.round((participants.length / classItem.maxParticipants) * 100)
    : 0;

  const formatDate = (date: string | Date) => {
    if (!date) return "No date set";
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return isValid(dateObj) ? format(dateObj, "PPp") : "Invalid date";
  };

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
                {formatDate(classItem.date)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="font-medium">{classItem.duration || "Not set"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Price</p>
              <p className="font-medium">${classItem.price}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Capacity</p>
              <p className="font-medium">
                {participants.length}/{classItem.maxParticipants}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Class Capacity</span>
              <span>{occupancyRate}%</span>
            </div>
            <Progress value={occupancyRate} />
          </div>

          <div className="space-y-4">
            <div className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Bookings & Requests
                </h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate(`/teach/classes/${classItem.id}/bookings`)}
                >
                  <Users className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                <ParticipantsTable participants={participants} />
                {classItem.bookingRequests?.length > 0 && (
                  <BookingRequestsTable requests={classItem.bookingRequests} />
                )}
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full"
                  onClick={() => navigate(`/teach/messages/bulk/${classItem.id}`)}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message Participants
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
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate(`/teach/classes/${classItem.id}/discounts/new`)}
                >
                  Create Discount
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate(`/teach/classes/${classItem.id}/boost`)}
                >
                  Instant Boost
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate(`/teach/classes/${classItem.id}/share`)}
                >
                  Share Class
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate(`/teach/classes/${classItem.id}/sessions/new`)}
                >
                  Add Session
                </Button>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate(`/teach/classes/${classItem.id}/edit`)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Class Details
            </Button>
          </div>

          <Button
            variant="default"
            className="w-full"
            onClick={() => navigate(`/teach/classes/${classItem.id}`)}
          >
            Full Class Management
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassCard;