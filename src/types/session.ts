
export interface Session {
  id: number;
  date: Date | string;
  start_time: string;
  end_time?: string;
  is_recurring?: boolean;
  recurrence_pattern?: string;
  recurrence_end_date?: Date | string;
  recurring_weeks?: number;
}
