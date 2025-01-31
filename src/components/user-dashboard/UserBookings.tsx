import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const UserBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          course:courses(title, location),
          session:course_sessions(start_time)
        `)
        .eq('student_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Type guard to ensure data matches Booking type
      const isValidBooking = (booking: any): booking is Booking => {
        return (
          booking &&
          typeof booking.id === 'number' &&
          typeof booking.booking_type === 'string' &&
          typeof booking.status === 'string' &&
          typeof booking.payment_status === 'string' &&
          booking.session &&
          !('error' in booking.session) && // Check that session is not an error object
          typeof booking.session.start_time === 'string' &&
          booking.course &&
          typeof booking.course.title === 'string' &&
          typeof booking.course.location === 'string'
        );
      };

      // Filter and set only valid bookings
      const validBookings = Array.isArray(data) ? data.filter(isValidBooking) : [];
      setBookings(validBookings);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error fetching bookings",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" } = {
      confirmed: "default",
      pending: "secondary",
      cancelled: "destructive",
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Your Bookings</CardTitle>
            <CardDescription>View and manage your class bookings</CardDescription>
          </div>
          <Calendar className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        {bookings.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            You haven't made any bookings yet.
          </p>
        ) : (
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
                    {format(new Date(booking.session.start_time), "PPp")}
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
        )}
      </CardContent>
    </Card>
  );
};

export default UserBookings;