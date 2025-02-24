
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
