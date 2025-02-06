
export interface CourseMatch {
  id: number;
  user_id: string;
  course_id: number;
  match_score: number;
  interest_score: number;
  location_score: number;
  trending_score: number;
  booking_history_score: number;
  notified_at: string | null;
  created_at: string;
  course: {
    id: number;
    title: string;
    description: string;
    location: string;
    price: number;
    tags: string[];
    category: string;
  };
  profile?: {
    first_name: string | null;
    last_name: string | null;
  };
}
