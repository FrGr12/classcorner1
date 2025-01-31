import { format } from "date-fns";
import { MessageSquare, Calendar, CheckSquare, XSquare } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Booking } from "@/types/booking";

interface BookingsTableProps {
  bookings: Booking[];
  onStatusUpdate: (bookingId: number, status: string) => Promise<void>;
  onReschedule: (booking: Booking) => void;
}

const BookingsTable = ({ bookings, onStatusUpdate, onReschedule }: BookingsTableProps) => {
  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" } = {
      confirmed: "default",
      pending: "secondary",
      cancelled: "destructive",
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  if (bookings.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        No bookings found for the selected filter.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student ID</TableHead>
          <TableHead>Class</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Payment</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking.id}>
            <TableCell>{booking.student_id}</TableCell>
            <TableCell>{booking.course.title}</TableCell>
            <TableCell>
              {format(new Date(booking.session.start_time), "PPp")}
            </TableCell>
            <TableCell>{getStatusBadge(booking.status)}</TableCell>
            <TableCell>
              <Badge variant="outline">{booking.payment_status}</Badge>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                {booking.status === 'pending' && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => onStatusUpdate(booking.id, 'confirmed')}
                    >
                      <CheckSquare className="h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => onStatusUpdate(booking.id, 'cancelled')}
                    >
                      <XSquare className="h-4 w-4" />
                      Decline
                    </Button>
                  </>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => onReschedule(booking)}
                >
                  <Calendar className="h-4 w-4" />
                  Reschedule
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BookingsTable;