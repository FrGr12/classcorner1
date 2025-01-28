export interface Booking {
  id: number;
  course_id: number;
  session_id: number;
  student_id: string;
  booking_type: string;
  status: string;
  group_size: number;
  total_price: number;
  payment_status: string;
  created_at: string;
  updated_at: string;
  course: {
    title: string;
  };
  session: {
    start_time: string;
  };
  student: {
    id: string;
    first_name: string | null;
    last_name: string | null;
    email?: string;
  };
}