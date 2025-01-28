import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BookingsTable from "./bookings/BookingsTable";
import BookingsFilter from "./bookings/BookingsFilter";
import RescheduleDialog from "./bookings/RescheduleDialog";
import type { Booking } from "@/types/booking";
import { Loader2 } from "lucide-react";

const TeacherBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
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
          course:courses(title),
          session:course_sessions(start_time),
          profiles!bookings_student_id_fkey(
            id,
            first_name,
            last_name
          )
        `)
        .eq('courses.instructor_id', user.id);

      if (error) throw error;

      setBookings(data as Booking[]);
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

  const handleStatusUpdate = async (bookingId: number, status: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', bookingId);

      if (error) throw error;

      toast({
        title: "Booking status updated",
        description: `Booking has been ${status}`,
      });

      fetchBookings();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error updating booking",
        description: error.message,
      });
    }
  };

  const handleReschedule = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsRescheduleOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Bookings</h1>
        <p className="text-muted-foreground">
          Manage your class bookings and participant requests
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Booking Management</CardTitle>
          <CardDescription>
            View and manage your class bookings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BookingsFilter />
          <BookingsTable
            bookings={bookings}
            onStatusUpdate={handleStatusUpdate}
            onReschedule={handleReschedule}
          />
        </CardContent>
      </Card>

      <RescheduleDialog
        booking={selectedBooking}
        open={isRescheduleOpen}
        onOpenChange={setIsRescheduleOpen}
      />
    </div>
  );
};

export default TeacherBookings;