
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
import { mockClasses } from "@/data/mockClasses";

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

// Dummy instructors data for preview
const dummyInstructors: Record<string, InstructorProfile> = {
  "1": {
    id: "1",
    firstName: "Sarah",
    lastName: "Johnson",
    displayName: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 234-567-8901",
    bio: "I'm a pottery artist with over 15 years of experience. I specialize in wheel throwing and hand-building techniques, and I love sharing my passion with students of all skill levels.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    location: "London, UK",
    teachingExperience: "15+ years teaching pottery classes",
    expertise: ["Wheel Throwing", "Hand Building", "Glazing Techniques", "Raku Firing"],
    preferredTeachingMethod: "in-person",
    portfolioUrl: "https://www.sarahjohnsonpottery.com",
    averageRating: 4.8,
    totalReviews: 127,
    totalStudents: 850,
    totalClasses: 42,
    socialMedia: {
      instagram: "sarahjohnsonpottery",
      linkedin: "https://linkedin.com/in/sarahjohnsonpottery",
      website: "https://www.sarahjohnsonpottery.com"
    },
    classes: mockClasses["Pottery"].slice(0, 2),
    userType: "teacher"
  },
  "2": {
    id: "2",
    firstName: "Michael",
    lastName: "Chen",
    displayName: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "+1 345-678-9012",
    bio: "I've been a ceramics instructor for over a decade, focusing on contemporary pottery techniques. My approach combines traditional methods with modern artistic expression, helping students develop their unique style.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    location: "Manchester, UK",
    teachingExperience: "12 years teaching experience",
    expertise: ["Contemporary Ceramics", "Sculptural Pottery", "Surface Design", "Kiln Firing"],
    preferredTeachingMethod: "in-person",
    portfolioUrl: "https://www.michaelchenceramics.com",
    averageRating: 4.9,
    totalReviews: 94,
    totalStudents: 620,
    totalClasses: 28,
    socialMedia: {
      instagram: "michaelchencraft",
      linkedin: "https://linkedin.com/in/michaelchencraft",
      website: "https://www.michaelchencraft.com"
    },
    classes: mockClasses["Pottery"].slice(2, 4),
    userType: "teacher"
  },
  "3": {
    id: "3",
    firstName: "Marco",
    lastName: "Rossi",
    displayName: "Marco Rossi",
    email: "marco.rossi@example.com",
    phone: "+1 456-789-0123",
    bio: "As an Italian chef with 20 years of experience, I bring authentic pasta-making traditions to my classes. I trained in Italy and have worked in Michelin-starred restaurants before dedicating myself to teaching the art of Italian cuisine.",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    location: "Birmingham, UK",
    teachingExperience: "8 years teaching Italian cooking",
    expertise: ["Fresh Pasta Making", "Italian Regional Cuisine", "Sauce Preparation", "Italian Desserts"],
    preferredTeachingMethod: "in-person",
    portfolioUrl: "https://www.chefmarcorossi.com",
    averageRating: 4.7,
    totalReviews: 83,
    totalStudents: 540,
    totalClasses: 32,
    socialMedia: {
      instagram: "chefmarcorossi",
      linkedin: "https://linkedin.com/in/chefmarcorossi",
      website: "https://www.chefmarcorossi.com"
    },
    classes: mockClasses["Cooking"],
    userType: "teacher"
  }
};

const dummyReviews: InstructorReview[] = [
  {
    id: 1,
    instructorId: "1",
    reviewerId: "user1",
    reviewerName: "Emma Williams",
    reviewerAvatar: "https://randomuser.me/api/portraits/women/22.jpg",
    rating: 5,
    comment: "Sarah is an amazing teacher! Her pottery class was so well-structured, and she was incredibly patient with beginners like me. I created a beautiful bowl that I'm proud to display in my home.",
    classId: 1,
    className: "Introduction to Pottery",
    date: "2023-10-15",
    instructorResponse: "Thank you so much, Emma! It was a pleasure having you in class. Your bowl turned out beautifully, and I hope to see you in one of my advanced classes soon!"
  },
  {
    id: 2,
    instructorId: "1",
    reviewerId: "user2",
    reviewerName: "James Taylor",
    reviewerAvatar: "https://randomuser.me/api/portraits/men/43.jpg",
    rating: 4,
    comment: "I took Sarah's wheel throwing workshop, and it was very informative. She clearly knows her craft and explains techniques well. The only reason for 4 stars instead of 5 is that the class was a bit crowded, which limited one-on-one time.",
    classId: 2,
    className: "Wheel Throwing Workshop",
    date: "2023-09-22"
  },
  {
    id: 3,
    instructorId: "2",
    reviewerId: "user3",
    reviewerName: "Sophia García",
    reviewerAvatar: "https://randomuser.me/api/portraits/women/63.jpg",
    rating: 5,
    comment: "Michael's advanced pottery techniques class pushed my skills to the next level. His innovative approach to form and texture has completely transformed how I think about ceramics. Highly recommended!",
    classId: 9,
    className: "Advanced Pottery Techniques",
    date: "2023-11-05",
    instructorResponse: "I'm thrilled to hear that, Sophia! Your pieces showed remarkable improvement, and I was impressed by your willingness to experiment with new techniques."
  }
];

const InstructorProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [instructor, setInstructor] = useState<InstructorProfile | null>(null);
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [reviews, setReviews] = useState<InstructorReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  useEffect(() => {
    // For demo/preview purposes, we'll use the dummy data
    if (import.meta.env.DEV && (id === "1" || id === "2" || id === "3")) {
      // Use dummy data for previewing
      const dummyInstructor = dummyInstructors[id];
      if (dummyInstructor) {
        setInstructor(dummyInstructor);
        setClasses(dummyInstructor.classes);
        setReviews(dummyReviews.filter(review => review.instructorId === id));
        setIsLoading(false);
        return;
      }
    }

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
          minParticipants: course.min_participants,
          duration: course.duration || "2 hours"
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
      // Since we don't have a status property in the ClassItem type, we'll skip this filter in the dummy data
      // In a real implementation, you would filter by status if available
      setClasses(instructor?.classes || []);
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
        <div className="min-h-[calc(100vh-72px)] flex items-center justify-center pt-20">
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
        <div className="min-h-[calc(100vh-72px)] flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Instructor Not Found</h1>
            <p className="text-neutral-600">The instructor you're looking for doesn't exist or has been removed.</p>
            <div className="mt-6 space-y-4">
              <p className="text-neutral-800 font-medium">Try one of our demo instructors:</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="/instructor/1" className="px-4 py-2 bg-accent-purple text-white rounded-md hover:bg-accent-purple/90 transition-colors">
                  Sarah Johnson
                </a>
                <a href="/instructor/2" className="px-4 py-2 bg-accent-purple text-white rounded-md hover:bg-accent-purple/90 transition-colors">
                  Michael Chen
                </a>
                <a href="/instructor/3" className="px-4 py-2 bg-accent-purple text-white rounded-md hover:bg-accent-purple/90 transition-colors">
                  Marco Rossi
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pt-24 mt-10">
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
