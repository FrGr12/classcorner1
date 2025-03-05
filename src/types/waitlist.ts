
export interface WaitlistEntry {
  id: number;
  user_id: string;
  course_id: number;
  status: 'waiting' | 'notified' | 'expired' | 'promoted' | string;
  position?: number; // Make optional to match actual data
  created_at: string;
  updated_at?: string;
  notification_sent_at?: string;
  notification_expires_at?: string;
  notification_sent_count?: number;
  last_notification_sent_at?: string;
  user_email?: string;
  user_name?: string;
  waitlist_position?: number;
  notification_status?: string;
  course: {
    title: string;
    auto_promote_from_waitlist?: boolean;
    auto_send_waitlist_notification?: boolean;
  };
  profile?: {
    first_name: string;
    last_name: string;
    avatar_url?: string;
  };
}

export interface AttendanceRecord {
  id: number;
  session_id: number;
  user_id?: string; // Make optional to match actual data
  status?: 'present' | 'absent' | 'late' | 'excused'; // Make optional to match actual data
  check_in_time?: string;
  check_out_time?: string;
  notes?: string;
  created_at: string;
  updated_at?: string;
  // Properties used in AttendanceTracking
  booking_id?: number;
  attendance_status?: string;
  booking?: {
    student: {
      first_name: string;
      last_name: string;
    };
  };
  marked_at?: string;
  marked_by?: string;
}

// Use export type for re-exporting to fix TS1205 error
export type { Session } from './session';
