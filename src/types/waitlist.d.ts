
export interface WaitlistEntry {
  id: number;
  user_id: string;
  course_id: number;
  status: 'waiting' | 'notified' | 'expired' | 'promoted';
  position: number;
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
    auto_promote_from_waitlist: boolean;
    auto_send_waitlist_notification: boolean;
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
  user_id: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  check_in_time?: string;
  check_out_time?: string;
  notes?: string;
  created_at: string;
  updated_at?: string;
}
