/**
 * Helper functions to transform raw data from the database to application models
 */

import { UserType, InstructorClassification } from "@/types/user";
import { ClassItem } from "@/types/class";
import { InstructorProfile, InstructorReview } from "@/types/instructor";
import { ProfileData, ReviewData } from "./types";

/**
 * Transforms database class data to ClassItem objects
 */
export const transformClassesData = (
  classesData: any[],
  instructorProfile: ProfileData,
  instructorId: string
): ClassItem[] => {
  return classesData.map((course) => ({
    id: course.id,
    title: course.title,
    description: course.description,
    price: course.price,
    instructor: `${instructorProfile.first_name || ""} ${instructorProfile.last_name || ""}`,
    instructor_id: instructorId,
    images: course.course_images?.map((img: any) => img.image_path) || ["/placeholder.svg"],
    rating: course.course_reviews?.length > 0 
      ? course.course_reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / course.course_reviews.length 
      : 0,
    level: course.skill_level || "beginner",
    category: course.category,
    date: new Date(),
    city: course.location,
    maxParticipants: course.max_participants,
    minParticipants: course.min_participants,
    duration: course.duration || "2 hours"
  }));
};

/**
 * Transforms database review data to InstructorReview objects
 */
export const transformReviewsData = (
  reviewsData: ReviewData[],
  instructorId: string
): InstructorReview[] => {
  return reviewsData.map((review) => ({
    id: review.id,
    instructorId: instructorId || "",
    reviewerId: review.reviewer_id,
    reviewerName: `${review.profiles?.first_name || ''} ${review.profiles?.last_name || ''}`,
    reviewerAvatar: review.profiles?.avatar_url,
    rating: review.rating,
    comment: review.review_text,
    classId: review.course_id,
    className: review.courses?.title,
    date: new Date(review.created_at).toLocaleDateString(),
    instructorResponse: review.instructor_response
  }));
};

/**
 * Transforms database profile data to an InstructorProfile object
 */
export const createInstructorProfile = (
  instructorProfile: ProfileData,
  instructorId: string,
  formattedClasses: ClassItem[],
  averageRating: number,
  totalReviews: number
): InstructorProfile => {
  // Parse social media from JSON if needed
  let socialMediaObj: { instagram?: string; linkedin?: string; website?: string } = {};
  
  if (instructorProfile.social_media) {
    if (typeof instructorProfile.social_media === 'object') {
      socialMediaObj = instructorProfile.social_media;
    } else if (typeof instructorProfile.social_media === 'string') {
      try {
        socialMediaObj = JSON.parse(instructorProfile.social_media);
      } catch (e) {
        console.error("Error parsing social media:", e);
      }
    }
  }

  // Map database user_type to our UserType enum
  const userTypeValue: UserType = 
    instructorProfile.user_type === "teacher" ? "teacher" : 
    instructorProfile.user_type === "student" ? "student" : "admin";

  // Determine instructor classification based on profile data
  let classification: InstructorClassification = null;
  if (instructorProfile.classification) {
    classification = instructorProfile.classification as InstructorClassification;
  }

  return {
    id: instructorProfile.user_type === "teacher" ? instructorId || "" : "",
    firstName: instructorProfile.first_name || "",
    lastName: instructorProfile.last_name || "",
    displayName: `${instructorProfile.first_name || ""} ${instructorProfile.last_name || ""}`,
    email: instructorProfile.email,
    phone: instructorProfile.phone,
    bio: instructorProfile.bio || "Experienced instructor passionate about teaching creative skills.",
    avatar: instructorProfile.avatar_url,
    location: instructorProfile.location,
    teachingExperience: instructorProfile.teaching_experience || "10+ years of teaching experience",
    expertise: instructorProfile.expertise || [],
    preferredTeachingMethod: instructorProfile.preferred_teaching_method || "in-person",
    portfolioUrl: instructorProfile.portfolio_url,
    averageRating: averageRating,
    totalReviews: totalReviews,
    totalStudents: 0, // This would come from a different query
    totalClasses: formattedClasses.length,
    classification: classification,
    socialMedia: socialMediaObj,
    classes: formattedClasses,
    userType: userTypeValue
  };
};

/**
 * Calculates the average rating from a list of reviews
 */
export const calculateAverageRating = (reviews: InstructorReview[]): number => {
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return reviews.length > 0 ? totalRating / reviews.length : 0;
};
