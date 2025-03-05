
export interface AttendanceRecord {
  id: number;
  session_id: number;
  user_id: string;
  status: string;
  created_at: string;
  // Additional fields for AttendanceTracking component
  booking_id?: number;
  attendance_status?: string;
  notes?: string | null;
  marked_at?: string | null;
  marked_by?: string | null;
  updated_at?: string;
  booking?: {
    student: {
      first_name: string;
      last_name: string;
    }
  };
}

export interface Session {
  id: number;
  date: string;
  start_time: string;
  end_time: string;
  // Additional fields
  start?: Date;
}

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
  notification_sent_count: number;
  notification_expires_at: string | null;
  last_notification_sent_at: string | null;
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
