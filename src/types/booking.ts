export interface Booking {
  id: number;
  course_id: number;
  session_id: number;
  student_id: string;
  booking_type: string;
  status: string;
  group_size?: number;
  total_price?: number;
  payment_status: string;
  created_at: string;
  updated_at: string;
  special_requests?: string;
  cancellation_reason?: string;
  cancellation_date?: string;
  original_session_id?: number;
  rescheduled_at?: string;
  course: {
    title: string;
    location: string;
  };
  session?: {
    start_time: string | null;
  } | null;
}