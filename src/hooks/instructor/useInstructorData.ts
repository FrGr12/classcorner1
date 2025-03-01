
/**
 * Hook to fetch real instructor data from the Supabase database
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { InstructorProfile, InstructorReview } from "@/types/instructor";
import { ClassItem } from "@/types/class";
import { ProfileData, ReviewData, InstructorProfileResult } from "./types";
import { 
  transformClassesData, 
  transformReviewsData, 
  createInstructorProfile,
  calculateAverageRating
} from "./transformData";

export const useInstructorData = (id: string | undefined): InstructorProfileResult => {
  const navigate = useNavigate();
  const [instructor, setInstructor] = useState<InstructorProfile | null>(null);
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [reviews, setReviews] = useState<InstructorReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  useEffect(() => {
    const fetchInstructorData = async () => {
      try {
        setIsLoading(true);
        
        if (!id) {
          throw new Error("Instructor ID is required");
        }

        // Fetch instructor profile
        const { data: instructorData, error: instructorError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", id)
          .eq("user_type", "teacher")
          .single();

        if (instructorError) throw instructorError;
        if (!instructorData) {
          toast.error("Instructor not found");
          navigate("/");
          return;
        }

        const instructorProfile = instructorData as ProfileData;

        // Fetch instructor's classes
        const { data: classesData, error: classesError } = await supabase
          .from("courses")
          .select(`
            id, 
            title, 
            description, 
            price, 
            category, 
            location, 
            max_participants, 
            min_participants,
            status,
            skill_level,
            duration,
            created_at,
            updated_at,
            course_images (
              image_path
            ),
            course_reviews (
              rating
            )
          `)
          .eq("instructor_id", id);

        if (classesError) throw classesError;

        // Fetch instructor reviews
        const { data: reviewsData, error: reviewsError } = await supabase
          .from("course_reviews")
          .select(`
            id,
            course_id,
            courses (
              title
            ),
            reviewer_id,
            profiles (
              first_name,
              last_name,
              avatar_url
            ),
            rating,
            review_text,
            instructor_response,
            created_at
          `)
          .eq("courses.instructor_id", id)
          .order("created_at", { ascending: false });

        if (reviewsError) throw reviewsError;

        // Transform the data
        const formattedClasses = transformClassesData(classesData, instructorProfile, id);
        const formattedReviews = transformReviewsData(reviewsData as ReviewData[], id);
        const averageRating = calculateAverageRating(formattedReviews);

        // Set instructor profile with additional data
        setInstructor(createInstructorProfile(
          instructorProfile, 
          id, 
          formattedClasses, 
          averageRating, 
          formattedReviews.length
        ));
        
        setClasses(formattedClasses);
        setReviews(formattedReviews);
      } catch (error: any) {
        console.error("Error fetching instructor data:", error);
        toast.error(error.message || "Failed to load instructor profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstructorData();
  }, [id, navigate]);

  const filterClasses = (filter: string) => {
    setActiveFilter(filter);
    
    if (filter === "all") {
      setClasses(instructor?.classes || []);
      return;
    }
    
    if (filter === "active") {
      // In a real implementation, you would filter by status if available
      setClasses(instructor?.classes || []);
      return;
    }
    
    // Filter by category
    setClasses((instructor?.classes || []).filter(cls => 
      cls.category?.toLowerCase() === filter.toLowerCase()
    ));
  };

  return {
    instructor,
    classes,
    reviews,
    isLoading,
    activeFilter,
    filterClasses
  };
};
