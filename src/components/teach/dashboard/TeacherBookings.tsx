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

const TeacherBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
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
          id,
          booking_type,
          status,
          group_size,
          total_price,
          payment_status,
          created_at,
          updated_at,
          course:courses(id, title),
          session:course_sessions(id, start_time),
          student_id,
          student:profiles!student_id(id, first_name, last_name, email)
        `)
        .eq('courses.instructor_id', user.id);

      if (filter === "upcoming") {
        query = query.gt('course_sessions.start_time', new Date().toISOString());
      } else if (filter === "past") {
        query = query.lt('course_sessions.start_time', new Date().toISOString());
      }

      const { data, error } = await query;

      if (error) throw error;
      
      // Transform the data to match the Booking type
      const transformedBookings: Booking[] = data.map(booking => ({
        ...booking,
        course_id: booking.course.id,
        session_id: booking.session.id,
        student_id: booking.student_id,
        course: {
          title: booking.course.title
        },
        session: {
          start_time: booking.session.start_time
        },
        student: {
          first_name: booking.student.first_name,
          last_name: booking.student.last_name,
          email: booking.student.email
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

  const handleMessage = async (booking: Booking) => {
    // TODO: Implement messaging functionality
    toast({
      title: "Coming soon",
      description: "Messaging functionality will be implemented soon",
    });
  };

  const handleReschedule = async (booking: Booking) => {
    // TODO: Implement rescheduling functionality
    toast({
      title: "Coming soon",
      description: "Rescheduling functionality will be implemented soon",
    });
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
          onMessage={handleMessage}
          onReschedule={handleReschedule}
        />
      </CardContent>
    </Card>
  );
};

export default TeacherBookings;