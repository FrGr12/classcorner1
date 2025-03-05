
export interface WaitlistEntry {
  id: number;
  user_id: string;
  course_id: number;
  status: string;
  created_at: string;
  notification_sent_at: string | null;
  notification_sent_count: number;
  notification_expires_at: string | null;
  last_notification_sent_at: string | null;
  waitlist_position: number;
  notification_status: 'sent' | 'waiting';
  course: {
    title: string;
    auto_promote_from_waitlist: boolean;
    auto_send_waitlist_notification: boolean;
  };
  profile?: {
    first_name: string;
    last_name: string;
  };
}
