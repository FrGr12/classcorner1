import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Booking } from "@/types/booking";
import BookingsTable from "./bookings/BookingsTable";
import BookingsFilter from "./bookings/BookingsFilter";
import RescheduleDialog from "./bookings/RescheduleDialog";

const TeacherBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchBookings();
  }, [filter]);

  const fetchBookings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      let query = supabase
        .from('bookings')
        .select(`
          *,
          courses:course_id(id, title),
          course_sessions:session_id(id, start_time),
          student:student_id(
            profiles:id(
              first_name,
              last_name
            )
          )
        `)
        .eq('courses.instructor_id', user.id);

      if (filter === "upcoming") {
        query = query.gt('course_sessions.start_time', new Date().toISOString());
      } else if (filter === "past") {
        query = query.lt('course_sessions.start_time', new Date().toISOString());
      }

      const { data, error } = await query;

      if (error) throw error;
      
      if (!data) return;

      const transformedBookings: Booking[] = data.map(booking => ({
        id: booking.id,
        course_id: booking.course_id,
        session_id: booking.session_id,
        student_id: booking.student_id,
        booking_type: booking.booking_type,
        status: booking.status,
        group_size: booking.group_size,
        total_price: booking.total_price,
        payment_status: booking.payment_status,
        created_at: booking.created_at,
        updated_at: booking.updated_at,
        course: {
          title: booking.courses.title
        },
        session: {
          start_time: booking.course_sessions.start_time
        },
        student: {
          first_name: booking.student.profiles.first_name,
          last_name: booking.student.profiles.last_name,
          email: booking.student_id
        }
      }));

      setBookings(transformedBookings);
    } catch (error: any) {
      toast({
        title: "Error fetching bookings",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBookingStatus = async (bookingId: number, status: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', bookingId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Booking ${status} successfully`,
      });

      fetchBookings();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleReschedule = async (booking: Booking) => {
    setSelectedBooking(booking);
  };

  const handleRescheduleConfirm = async (bookingId: number, sessionId: number) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ session_id: sessionId })
        .eq('id', bookingId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Booking rescheduled successfully",
      });

      setSelectedBooking(null);
      fetchBookings();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const filteredBookings = bookings.filter(booking =>
    booking.student &&
    (booking.student.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.student.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.course.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Bookings</CardTitle>
            <CardDescription>
              Manage your class bookings and participants
            </CardDescription>
          </div>
          <BookingsFilter
            filter={filter}
            searchTerm={searchTerm}
            onFilterChange={setFilter}
            onSearchChange={setSearchTerm}
          />
        </div>
      </CardHeader>
      <CardContent>
        <BookingsTable
          bookings={filteredBookings}
          onStatusUpdate={handleUpdateBookingStatus}
          onReschedule={handleReschedule}
        />
        {selectedBooking && (
          <RescheduleDialog
            booking={selectedBooking}
            onClose={() => setSelectedBooking(null)}
            onConfirm={handleRescheduleConfirm}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default TeacherBookings;