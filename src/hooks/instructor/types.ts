
/**
 * Types related to instructor data transformations and API responses
 */

import { InstructorProfile, InstructorReview } from "@/types/instructor";
import { ClassItem } from "@/types/class";

/**
 * Raw instructor profile data from the database
 */
export interface ProfileData {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  bio?: string;
  avatar_url?: string;
  location?: string;
  teaching_experience?: string;
  expertise?: string[];
  preferred_teaching_method?: string;
  portfolio_url?: string;
  social_media?: any;
  user_type: string;
}

/**
 * Raw review data from the database
 */
export interface ReviewData {
  id: number;
  course_id: number;
  reviewer_id: string;
  rating: number;
  review_text: string;
  instructor_response?: string;
  created_at: string;
  courses?: {
    title?: string;
  };
  profiles?: {
    first_name?: string;
    last_name?: string;
    avatar_url?: string;
  };
}

/**
 * Return type of the useInstructorProfile hook
 */
export interface InstructorProfileResult {
  instructor: InstructorProfile | null;
  classes: ClassItem[];
  reviews: InstructorReview[];
  isLoading: boolean;
  activeFilter: string;
  filterClasses: (filter: string) => void;
}
