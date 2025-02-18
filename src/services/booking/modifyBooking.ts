
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { getBookingById } from "./getBooking";

export const cancelBooking = async (
  bookingId: number, 
  reason: string
): Promise<void> => {
  try {
    // Get booking details first to check cancellation eligibility
    const booking = await getBookingById(bookingId);
    if (!booking.session?.start_time) {
      throw new Error("Invalid booking session time");
    }

    const sessionDate = new Date(booking.session.start_time);
    const now = new Date();
    const hoursUntilSession = (sessionDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    // Check if eligible for refund (more than 48 hours before class)
    const isRefundEligible = hoursUntilSession > 48;

    const { error } = await supabase
      .from('bookings')
      .update({
        status: 'cancelled',
        cancellation_reason: reason,
        cancellation_date: new Date().toISOString()
      })
      .eq('id', bookingId);

    if (error) throw error;

    // If eligible for refund, update payment status
    if (isRefundEligible) {
      const { error: refundError } = await supabase
        .from('bookings')
        .update({
          payment_status: 'refunded'
        })
        .eq('id', bookingId);

      if (refundError) throw refundError;
      toast.success("Booking cancelled with full refund");
    } else {
      toast.success("Booking cancelled without refund (within 48-hour window)");
    }

    // Notify instructor about cancellation
    await supabase
      .from('notification_logs')
      .insert([
        {
          user_id: booking.course?.instructor_id,
          notification_type: 'booking_cancelled',
          content: `Booking cancelled for ${booking.course?.title}`,
          status: 'pending',
          booking_id: bookingId
        }
      ]);
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
      .maybeSingle();

    if (fetchError) throw fetchError;
    if (!booking) throw new Error("Booking not found");

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
