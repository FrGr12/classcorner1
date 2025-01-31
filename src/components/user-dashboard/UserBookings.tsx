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

      const isValidBooking = (item: unknown): item is Booking => {
        if (!item || typeof item !== 'object') return false;
        
        const booking = item as any;
        return (
          typeof booking.id === 'number' &&
          typeof booking.booking_type === 'string' &&
          typeof booking.status === 'string' &&
          typeof booking.payment_status === 'string' &&
          booking.course &&
          typeof booking.course === 'object' &&
          typeof booking.course.title === 'string' &&
          typeof booking.course.location === 'string'
        );
      };

      if (Array.isArray(data)) {
        const validBookings = data.filter(isValidBooking);
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