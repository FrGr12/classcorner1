
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ClassItem } from "@/types/class";
import { InstructorProfile, InstructorReview } from "@/types/instructor";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import InstructorHeader from "@/components/instructor-profile/InstructorHeader";
import InstructorBio from "@/components/instructor-profile/InstructorBio";
import InstructorClasses from "@/components/instructor-profile/InstructorClasses";
import InstructorReviews from "@/components/instructor-profile/InstructorReviews";
import ContactInstructor from "@/components/instructor-profile/ContactInstructor";
import { UserType } from "@/types/user";

interface ProfileData {
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

interface ReviewData {
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

const InstructorProfilePage = () => {
  const { id } = useParams();
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

        // Transform the data for the classes
        const formattedClasses = classesData.map((course) => ({
          id: course.id,
          title: course.title,
          description: course.description,
          price: course.price,
          instructor: `${instructorProfile.first_name || ""} ${instructorProfile.last_name || ""}`,
          instructor_id: id,
          images: course.course_images?.map((img: any) => img.image_path) || ["/placeholder.svg"],
          rating: course.course_reviews?.length > 0 
            ? course.course_reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / course.course_reviews.length 
            : 0,
          level: course.skill_level || "beginner",
          category: course.category,
          date: new Date(),
          city: course.location,
          maxParticipants: course.max_participants,
          minParticipants: course.minParticipants,
          duration: course.duration || "2 hours",
          status: course.status || "draft"
        }));

        // Transform the data for reviews
        const reviewsArray = reviewsData as ReviewData[];
        const formattedReviews = reviewsArray.map((review) => ({
          id: review.id,
          instructorId: id || "",
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

        // Calculate average rating
        const totalRating = formattedReviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = formattedReviews.length > 0 ? totalRating / formattedReviews.length : 0;

        // Convert social media from JSON if needed
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

        // Set instructor profile with additional data
        setInstructor({
          id: instructorProfile.user_type === "teacher" ? id || "" : "",
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
          totalReviews: formattedReviews.length,
          totalStudents: 0, // This would come from a different query
          totalClasses: formattedClasses.length,
          socialMedia: socialMediaObj,
          classes: formattedClasses,
          userType: userTypeValue
        });
        
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
      setClasses((instructor?.classes || []).filter(cls => cls.status === "published"));
      return;
    }
    
    // Filter by category
    setClasses((instructor?.classes || []).filter(cls => 
      cls.category?.toLowerCase() === filter.toLowerCase()
    ));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Navigation />
        <div className="min-h-[calc(100vh-72px)] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-accent-purple" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!instructor) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Navigation />
        <div className="min-h-[calc(100vh-72px)] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Instructor Not Found</h1>
            <p className="text-neutral-600">The instructor you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <InstructorHeader instructor={instructor} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2 space-y-8">
              <InstructorBio instructor={instructor} />
              <InstructorClasses 
                classes={classes} 
                activeFilter={activeFilter}
                onFilterChange={filterClasses}
              />
              <InstructorReviews reviews={reviews} instructor={instructor} />
            </div>
            
            <div className="lg:col-span-1 space-y-8">
              <ContactInstructor instructor={instructor} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InstructorProfilePage;
