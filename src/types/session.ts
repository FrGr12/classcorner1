
export interface Session {
  start: Date;
  isRecurring: boolean;
  recurrencePattern?: string;
  recurrenceEndDate?: Date;
  recurrenceCount?: number;
  recurring_weeks?: number;
}
