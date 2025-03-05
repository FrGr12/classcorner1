
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Participant {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  payment_status: string;
  attendance_status: string;
}

interface ParticipantsListProps {
  participants: Participant[];
}

const ParticipantsList = ({ participants }: ParticipantsListProps) => {
  if (participants.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={4} className="text-center text-muted-foreground">
          No participants yet
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {participants.map((participant) => (
        <TableRow key={participant.id}>
          <TableCell>
            {participant.first_name} {participant.last_name}
          </TableCell>
          <TableCell>{participant.email}</TableCell>
          <TableCell>{getPaymentStatusBadge(participant.payment_status)}</TableCell>
          <TableCell>{getAttendanceStatusBadge(participant.attendance_status)}</TableCell>
        </TableRow>
      ))}
    </>
  );
};

export const getPaymentStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case 'paid':
      return <Badge className="bg-green-500">Paid</Badge>;
    case 'pending':
      return <Badge variant="secondary">Pending</Badge>;
    default:
      return <Badge variant="destructive">Unpaid</Badge>;
  }
};

export const getAttendanceStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case 'present':
      return <Badge className="bg-green-500">Present</Badge>;
    case 'absent':
      return <Badge variant="destructive">Absent</Badge>;
    default:
      return <Badge variant="secondary">Pending</Badge>;
  }
};

export default ParticipantsList;
