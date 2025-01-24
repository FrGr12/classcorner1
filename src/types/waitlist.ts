export interface WaitlistEntry {
  id: number;
  course_id: number;
  session_id: number;
  user_id: string;
  status: string;
  created_at: string;
  course: {
    title: string;
  };
  profile: {
    first_name: string;
    last_name: string;
  } | null;
}