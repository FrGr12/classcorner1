
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Booking } from "@/types/booking";

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
      .maybeSingle();

    if (error) throw error;
    if (!data) throw new Error("Booking not found");

    return data as unknown as Booking;
  } catch (error: any) {
    toast.error(error.message || "Failed to fetch booking");
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

    return data as unknown as Booking[];
  } catch (error: any) {
    toast.error(error.message || "Failed to fetch bookings");
    throw error;
  }
};
