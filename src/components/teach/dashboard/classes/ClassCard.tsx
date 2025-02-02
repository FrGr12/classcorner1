import { MoreHorizontal, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface ClassCardProps {
  classItem: {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    maxParticipants: number;
    currentParticipants: number;
    waitlistCount: number;
    status: string;
    price: number;
    duration: string;
  };
  onAction: (action: string, classId: number) => void;
}

const ClassCard = ({ classItem, onAction }: ClassCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div>
          <CardTitle className="text-lg">{classItem.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{classItem.location}</p>
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
          <div className="flex justify-between text-sm">
            <span>Date & Time:</span>
            <span>{new Date(`${classItem.date} ${classItem.time}`).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Duration:</span>
            <span>{classItem.duration}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Price:</span>
            <span>${classItem.price}</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Participants:</span>
              <span>{classItem.currentParticipants}/{classItem.maxParticipants}</span>
            </div>
            <Progress 
              value={(classItem.currentParticipants / classItem.maxParticipants) * 100} 
            />
          </div>
          {classItem.waitlistCount > 0 && (
            <div className="flex items-center justify-between text-sm">
              <Badge variant="secondary" className="gap-1">
                <UserPlus className="h-3 w-3" />
                Waitlist: {classItem.waitlistCount}
              </Badge>
              <Button variant="link" className="text-xs p-0 h-auto">
                View List
              </Button>
            </div>
          )}
          <div className="pt-4 flex gap-2">
            <Button 
              variant="default" 
              className="flex-1"
              onClick={() => navigate(`/teach/classes/${classItem.id}`)}
            >
              Manage Class
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => navigate(`/teach/classes/${classItem.id}/bookings`)}
            >
              View Bookings
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassCard;