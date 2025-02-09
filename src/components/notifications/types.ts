
export interface DatabaseNotification {
  id: number;
  user_id: string;
  notification_type: string;
  content: string;
  status: string;
  booking_id?: number;
  error?: string;
  sent_at: string;
  category?: string;
  read_at?: string | null;
  reference_id?: string | null;
}

export interface Notification {
  id: string;
  user_id: string;
  notification_type: string;
  content: string;
  status: string;
  category: string;
  created_at: string;
  read_at: string | null;
  reference_id: string | null;
  booking_id?: number;
  error?: string;
}
