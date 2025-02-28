
import { ClassItem } from "./class";
import { UserType } from "./user";

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
  socialMedia?: {
    instagram?: string;
    linkedin?: string;
    website?: string;
  };
  classes: ClassItem[];
  userType: UserType;
}

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
