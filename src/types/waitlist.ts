
export interface WaitlistEntry {
  id: number;
  course_id: number;
  session_id: number;
  user_id: string;
  status: string;
  created_at: string;
  waitlist_position: number;
  notification_sent_at: string | null;
  notification_status: string;
  course: {
    title: string;
    auto_promote_from_waitlist: boolean;
    auto_send_waitlist_notification: boolean;
  };
  profile: {
    first_name: string;
    last_name: string;
  } | null;
}

export interface AttendanceRecord {
  id: number;
  booking_id: number;
  session_id: number;
  attendance_status: 'present' | 'absent' | 'pending';
  notes: string | null;
  marked_at: string | null;
  marked_by: string | null;
  created_at: string;
  updated_at: string;
  booking: {
    student: {
      first_name: string;
      last_name: string;
    };
  };
}

export interface Session {
  id: number;
  start_time: string;
}
