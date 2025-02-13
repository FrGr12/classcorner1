
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ClassItem } from "@/types/class";
import type { Booking, CreateBookingInput } from "@/types/booking";

export const createBooking = async (
  classItem: ClassItem,
  sessionId: number,
  specialRequests?: string
): Promise<Booking> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("You must be logged in to book a class");
    }

    const { data, error } = await supabase
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
      .select(`
        *,
        course:courses!inner(
          title,
          instructor_id,
          location
        ),
        session:course_sessions!inner(
          start_time
        )
      `)
      .single();

    if (error) throw error;
    if (!data) throw new Error("Failed to create booking");

    // Create a notification for the instructor
    await supabase
      .from('notification_logs')
      .insert([
        {
          user_id: data.course.instructor_id,
          notification_type: 'new_booking',
          content: `New booking received for ${data.course.title}`,
          status: 'pending',
          booking_id: data.id
        }
      ]);

    return data as Booking;
  } catch (error: any) {
    toast.error(error.message || "Failed to create booking");
    throw error;
  }
};

export const getBookingById = async (bookingId: number): Promise<Booking> => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        course:courses!inner(
          title,
          instructor_id,
          location
        ),
        session:course_sessions!inner(
          start_time
        ),
        student:profiles!bookings_student_id_fkey(
          id,
          first_name,
          last_name,
          email
        )
      `)
      .eq('id', bookingId)
      .single();

    if (error) throw error;
    if (!data) throw new Error("Booking not found");

    return data as Booking;
  } catch (error: any) {
    toast.error(error.message || "Failed to fetch booking");
    throw error;
  }
};

export const cancelBooking = async (
  bookingId: number, 
  reason: string
): Promise<void> => {
  try {
    const { error } = await supabase
      .from('bookings')
      .update({
        status: 'cancelled',
        cancellation_reason: reason,
        cancellation_date: new Date().toISOString()
      })
      .eq('id', bookingId);

    if (error) throw error;
    toast.success("Booking cancelled successfully");
  } catch (error: any) {
    toast.error(error.message || "Failed to cancel booking");
    throw error;
  }
};

export const rescheduleBooking = async (
  bookingId: number,
  newSessionId: number
): Promise<void> => {
  try {
    const { data: booking, error: fetchError } = await supabase
      .from('bookings')
      .select('session_id')
      .eq('id', bookingId)
      .single();

    if (fetchError) throw fetchError;

    const { error: updateError } = await supabase
      .from('bookings')
      .update({
        session_id: newSessionId,
        original_session_id: booking.session_id,
        rescheduled_at: new Date().toISOString()
      })
      .eq('id', bookingId);

    if (updateError) throw updateError;
    toast.success("Booking rescheduled successfully");
  } catch (error: any) {
    toast.error(error.message || "Failed to reschedule booking");
    throw error;
  }
};

export const getUserBookings = async (): Promise<Booking[]> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not found");

    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        course:courses!inner(
          title,
          instructor_id,
          location
        ),
        session:course_sessions!inner(
          start_time
        )
      `)
      .eq('student_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    if (!data) return [];

    return data as Booking[];
  } catch (error: any) {
    toast.error(error.message || "Failed to fetch bookings");
    throw error;
  }
};

export const updateBookingPaymentStatus = async (
  bookingId: number,
  status: string
): Promise<void> => {
  try {
    const { error } = await supabase
      .from('bookings')
      .update({ payment_status: status })
      .eq('id', bookingId);

    if (error) throw error;
  } catch (error: any) {
    toast.error(error.message || "Failed to update payment status");
    throw error;
  }
};
