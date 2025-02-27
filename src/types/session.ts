
export interface Session {
  id: number;
  course_id?: number;
  date: string;
  start_time: string;
  end_time?: string;
  is_recurring?: boolean;
  recurrence_pattern?: string;
  recurrence_end_date?: string;
  duration?: string;
}
