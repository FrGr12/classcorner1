export interface CourseMatch {
  id: number;
  user_id: string;
  course_id: number;
  match_score: number;
  notified_at: string | null;
  created_at: string;
  course: {
    title: string;
  };
  profile: {
    first_name: string;
    last_name: string;
    email?: string;
  } | null;
}