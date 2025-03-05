
import { ClassItem } from "./class";
import { UserType, InstructorClassification } from "./user";

/**
 * InstructorProfile represents a teacher's complete profile information
 * including personal details, teaching statistics, and associated classes
 */
export interface InstructorProfile {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email?: string;
  phone?: string;
  bio?: string;
  avatar?: string;
  location?: string;
  teachingExperience?: string;
  expertise?: string[];
  preferredTeachingMethod?: string;
  portfolioUrl?: string;
  averageRating: number;
  totalReviews: number;
  totalStudents: number;
  totalClasses: number;
  classification?: InstructorClassification;
  socialMedia?: {
    instagram?: string;
    linkedin?: string;
    website?: string;
  };
  classes: ClassItem[];
  userType: UserType;
}

/**
 * InstructorReview represents a review left by a student for an instructor
 * after taking one of their classes
 */
export interface InstructorReview {
  id: number;
  instructorId: string;
  reviewerId: string;
  reviewerName: string;
  reviewerAvatar?: string;
  rating: number;
  comment?: string;
  classId: number;
  className?: string;
  date: string;
  instructorResponse?: string;
}
