
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckCircle2, Clock, XCircle, Search, MoreVertical, Mail } from "lucide-react";

interface Participant {
  id: number;
  name: string;
  email?: string;
  status: string;
  paymentStatus: string;
  attendanceStatus?: string;
}

interface ParticipantsTableProps {
  participants: Participant[];
  onStatusUpdate: (participantId: number, status: string) => void;
}

const ParticipantsTable = ({ participants = [], onStatusUpdate }: ParticipantsTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge variant="default"><CheckCircle2 className="w-3 h-3 mr-1" aria-hidden="true" /> Confirmed</Badge>;
      case "pending":
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" aria-hidden="true" /> Pending</Badge>;
      case "cancelled":
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" aria-hidden="true" /> Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge variant="default">Paid</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "unpaid":
        return <Badge variant="destructive">Unpaid</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getAttendanceBadge = (status?: string) => {
    switch (status) {
      case "present":
        return <Badge variant="default">Present</Badge>;
      case "absent":
        return <Badge variant="destructive">Absent</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      default:
        return null;
    }
  };

  const filteredParticipants = participants.filter(participant =>
    participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (participant.email && participant.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (!participants || participants.length === 0) {
    return (
      <div className="text-sm text-muted-foreground" aria-label="No participants">
        No participants yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium" id="participants-heading">Participants ({participants.length})</h4>
        <div className="relative w-[200px]">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <Input
            placeholder="Search participants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
            aria-label="Search participants"
          />
        </div>
      </div>

      <Table aria-labelledby="participants-heading">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Attendance</TableHead>
            <TableHead><span className="sr-only">Actions</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredParticipants.map((participant) => (
            <TableRow key={participant.id}>
              <TableCell>{participant.name}</TableCell>
              <TableCell>
                {participant.email && (
                  <span className="text-sm text-muted-foreground">{participant.email}</span>
                )}
              </TableCell>
              <TableCell>{getStatusBadge(participant.status)}</TableCell>
              <TableCell>{getPaymentBadge(participant.paymentStatus)}</TableCell>
              <TableCell>{getAttendanceBadge(participant.attendanceStatus)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" aria-label={`Actions for ${participant.name}`}>
                      <MoreVertical className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={() => {}} aria-label={`Send message to ${participant.name}`}>
                      <Mail className="h-4 w-4 mr-2" aria-hidden="true" />
                      Send Message
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => onStatusUpdate(participant.id, 'confirmed')} aria-label={`Mark ${participant.name} as confirmed`}>
                      Mark as Confirmed
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => onStatusUpdate(participant.id, 'cancelled')} aria-label={`Cancel booking for ${participant.name}`}>
                      Cancel Booking
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ParticipantsTable;
