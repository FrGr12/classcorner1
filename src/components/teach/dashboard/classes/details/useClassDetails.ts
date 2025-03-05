
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Participant {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  payment_status: string;
  attendance_status: string;
}

interface WaitlistEntry {
  id: number;
  user: {
    first_name: string;
    last_name: string;
    email: string;
  };
  created_at: string;
  position: number;
}

export const useClassDetails = (classId: number | null, open: boolean) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [classDetails, setClassDetails] = useState<any>(null);

  useEffect(() => {
    if (open && classId) {
      fetchClassDetails();
    }
  }, [open, classId]);

  const fetchClassDetails = async () => {
    if (!classId) return;

    // Fetch class participants
    const { data: bookingsData, error: bookingsError } = await supabase
      .from('bookings')
      .select(`
        id,
        payment_status,
        attendance_status,
        profiles:student_id (
          first_name,
          last_name,
          email
        )
      `)
      .eq('course_id', classId);

    if (!bookingsError && bookingsData) {
      const formattedParticipants = bookingsData.map((booking: any) => ({
        id: booking.id,
        first_name: booking.profiles?.first_name || '',
        last_name: booking.profiles?.last_name || '',
        email: booking.profiles?.email || '',
        payment_status: booking.payment_status || 'pending',
        attendance_status: booking.attendance_status || 'pending'
      }));
      setParticipants(formattedParticipants);
    }

    // Fetch waitlist
    const { data: waitlistData, error: waitlistError } = await supabase
      .from('waitlist_entries')
      .select(`
        id,
        created_at,
        waitlist_position,
        profiles:user_id (
          first_name,
          last_name,
          email
        )
      `)
      .eq('course_id', classId)
      .eq('status', 'waiting')
      .order('waitlist_position', { ascending: true });

    if (!waitlistError && waitlistData) {
      setWaitlist(waitlistData.map((entry: any) => ({
        id: entry.id,
        user: {
          first_name: entry.profiles?.first_name || '',
          last_name: entry.profiles?.last_name || '',
          email: entry.profiles?.email || ''
        },
        created_at: entry.created_at,
        position: entry.waitlist_position
      })));
    }

    // Fetch class details
    const { data: classData } = await supabase
      .from('courses')
      .select('*')
      .eq('id', classId)
      .single();

    if (classData) {
      setClassDetails(classData);
    }
  };

  return { participants, waitlist, classDetails };
};
