
export interface Booking {
  id: number;
  course_id: number;
  session_id: number;
  student_id: string;
  booking_type: string;
  booking_source?: string;
  status: string;
  attendance_status?: string;
  group_size?: number;
  total_price?: number;
  payment_status: string;
  payout_status?: string;
  created_at: string;
  updated_at: string;
  special_requests?: string;
  cancellation_reason?: string;
  cancellation_date?: string;
  original_session_id?: number;
  rescheduled_at?: string;
  feedback_submitted?: boolean;
  course: {
    title: string;
    instructor_id: string;
    location: string;
  };
  session?: {
    start_time: string | null;
  } | null;
  student?: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  } | null;
}

export interface CreateBookingInput {
  course_id: number;
  session_id: number;
  special_requests?: string;
  group_size?: number;
  total_price: number;
  booking_type?: string;
}
