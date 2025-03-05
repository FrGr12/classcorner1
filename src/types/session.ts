
export interface Session {
  id: number;
  course_id?: number;
  date: string | Date;  // Allow both string and Date types
  start_time: string;
  end_time?: string;
  is_recurring?: boolean;
  recurrence_pattern?: string;
  recurrence_end_date?: string | Date;  // Allow both string and Date types
  duration?: string;
  // Properties used in AttendanceTracking and other places
  start?: string;
  isRecurring?: boolean;
  recurrencePattern?: string;
  recurrenceEndDate?: string | Date;  // Allow both string and Date types
  recurrenceCount?: number;
}
