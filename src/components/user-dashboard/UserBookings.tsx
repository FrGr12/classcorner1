import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoadingState from "./LoadingState";
import BookingsTable from "./BookingsTable";
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

      const isValidBooking = (item: any): item is Booking => {
        return (
          typeof item === 'object' &&
          item !== null &&
          typeof item.id === 'number' &&
          typeof item.booking_type === 'string' &&
          typeof item.status === 'string' &&
          typeof item.payment_status === 'string' &&
          item.course &&
          typeof item.course === 'object' &&
          typeof item.course.title === 'string' &&
          typeof item.course.location === 'string'
        );
      };

      if (Array.isArray(data)) {
        const validBookings = data
          .filter(isValidBooking)
          .map(booking => ({
            ...booking,
            session: booking.session && !('error' in booking.session) ? booking.session : null
          }));
        setBookings(validBookings);
      }
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

  if (loading) {
    return <LoadingState />;
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
        <BookingsTable bookings={bookings} />
      </CardContent>
    </Card>
  );
};

export default UserBookings;