
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { ClassItem } from "@/types/class";
import type { Booking } from "@/types/booking";

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
      .maybeSingle();

    if (error) throw error;
    if (!data) throw new Error("Failed to create booking");

    // Create a notification for the instructor
    await supabase
      .from('notification_logs')
      .insert([
        {
          user_id: data.course?.instructor_id,
          notification_type: 'new_booking',
          content: `New booking received for ${data.course?.title}`,
          status: 'pending',
          booking_id: data.id
        }
      ]);

    return data as unknown as Booking;
  } catch (error: any) {
    toast.error(error.message || "Failed to create booking");
    throw error;
  }
};
