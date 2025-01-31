import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ClassItem } from "@/types/class";

export const createBooking = async (
  classItem: ClassItem,
  sessionId: number,
  specialRequests?: string
) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("You must be logged in to book a class");
    }

    const { data: booking, error } = await supabase
      .from('bookings')
      .insert([
        {
          course_id: classItem.id,
          session_id: sessionId,
          student_id: user.id,
          booking_type: 'individual',
          status: 'pending',
          total_price: classItem.price,
          payment_status: 'pending',
          special_requests: specialRequests
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return booking;
  } catch (error: any) {
    toast.error(error.message || "Failed to create booking");
    throw error;
  }
};

export const getBookingById = async (bookingId: number) => {
  try {
    const { data: booking, error } = await supabase
      .from('bookings')
      .select(`
        *,
        course:courses(
          title,
          location,
          instructor_id
        ),
        session:course_sessions(
          start_time
        )
      `)
      .eq('id', bookingId)
      .single();

    if (error) throw error;
    return booking;
  } catch (error: any) {
    toast.error(error.message || "Failed to fetch booking");
    throw error;
  }
};