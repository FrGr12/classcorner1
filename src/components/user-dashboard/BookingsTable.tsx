import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Booking } from "@/types/booking";

interface BookingsTableProps {
  bookings: Booking[];
}

const getStatusBadge = (status: string) => {
  const variants: { [key: string]: "default" | "secondary" | "destructive" } = {
    confirmed: "default",
    pending: "secondary",
    cancelled: "destructive",
  };
  return <Badge variant={variants[status] || "default"}>{status}</Badge>;
};

const BookingsTable = ({ bookings }: BookingsTableProps) => {
  if (bookings.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        You haven't made any bookings yet.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Class</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Payment</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking.id}>
            <TableCell className="font-medium">
              {booking.course.title}
            </TableCell>
            <TableCell>
              {booking.session?.start_time ? 
                format(new Date(booking.session.start_time), "PPp") :
                "No date set"}
            </TableCell>
            <TableCell>{booking.course.location}</TableCell>
            <TableCell>{getStatusBadge(booking.status)}</TableCell>
            <TableCell>
              <Badge variant="outline">{booking.payment_status}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BookingsTable;