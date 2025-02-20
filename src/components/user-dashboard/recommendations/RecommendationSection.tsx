
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import SectionWrapper from "../overview/SectionWrapper";
import ClassesGrid from "../overview/ClassesGrid";
import type { ClassPreview } from "@/types/class";

interface InstructorProfile {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export const RecommendationSection = () => {
  const [recommendations, setRecommendations] = useState<ClassPreview[]>([]);
  const [alternativeClasses, setAlternativeClasses] = useState<ClassPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchRecommendations();
    fetchAlternativeClasses();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: matchData, error: matchError } = await supabase
        .from('course_matches')
        .select(`
          course:courses (
            id,
            title,
            description,
            price,
            location,
            category,
            instructor_id,
            images:course_images(image_path),
            instructor:profiles!courses_instructor_id_fkey (
              first_name,
              last_name,
              email,
              phone
            )
          )
        `)
        .eq('user_id', user.id)
        .order('match_score', { ascending: false })
        .limit(4);

      if (matchError) throw matchError;

      const formattedRecommendations = matchData?.map(item => {
        const instructorData = Array.isArray(item.course.instructor) 
          ? item.course.instructor[0] 
          : item.course.instructor as InstructorProfile;

        return {
          id: item.course.id,
          title: item.course.title,
          instructor: instructorData ? `${instructorData.first_name} ${instructorData.last_name}` : 'Unknown Instructor',
          price: item.course.price,
          rating: 4.5,
          images: item.course.images.map((img: any) => img.image_path),
          level: "All Levels",
          category: item.course.category,
          date: new Date(),
          city: item.course.location
        };
      });

      setRecommendations(formattedRecommendations || []);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load recommendations"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchAlternativeClasses = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: waitlistData, error: waitlistError } = await supabase
        .from('waitlist_entries')
        .select('courses(id, category)')
        .eq('user_id', user.id)
        .eq('status', 'waiting');

      if (waitlistError) throw waitlistError;

      if (waitlistData && waitlistData.length > 0) {
        const categories = waitlistData.map(entry => entry.courses.category);
        const waitlistedIds = waitlistData.map(entry => entry.courses.id);
        
        const { data: alternativeData, error: alternativeError } = await supabase
          .from('courses')
          .select(`
            id,
            title,
            price,
            location,
            instructor_id,
            category,
            course_images (
              image_path
            ),
            instructor:profiles!courses_instructor_id_fkey (
              first_name,
              last_name,
              email,
              phone
            )
          `)
          .in('category', categories)
          .eq('status', 'published')
          .not('id', 'in', waitlistedIds)
          .limit(4);

        if (alternativeError) throw alternativeError;

        const formattedAlternatives = alternativeData?.map(course => {
          const instructorData = Array.isArray(course.instructor) 
            ? course.instructor[0] 
            : course.instructor as InstructorProfile;

          return {
            id: course.id,
            title: course.title,
            instructor: instructorData ? `${instructorData.first_name} ${instructorData.last_name}` : 'Unknown Instructor',
            price: course.price,
            rating: 4.5,
            images: course.course_images.map((img: any) => img.image_path),
            level: "All Levels",
            category: course.category,
            date: new Date(),
            city: course.location
          };
        });

        setAlternativeClasses(formattedAlternatives || []);
      }
    } catch (error) {
      console.error("Error fetching alternative classes:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {recommendations.length > 0 && (
        <SectionWrapper
          title="Recommended For You"
          viewAllLink="/student-dashboard/recommendations"
        >
          <ClassesGrid
            classes={recommendations}
            emptyMessage="No recommendations available yet"
          />
        </SectionWrapper>
      )}

      {alternativeClasses.length > 0 && (
        <SectionWrapper
          title="Similar Classes You Might Like"
          viewAllLink="/student-dashboard/recommendations"
        >
          <ClassesGrid
            classes={alternativeClasses}
            emptyMessage="No similar classes found"
          />
        </SectionWrapper>
      )}

      {recommendations.length === 0 && alternativeClasses.length === 0 && (
        <SectionWrapper title="Recommendations">
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No recommendations available yet. Try browsing more classes or updating your preferences.
            </p>
          </div>
        </SectionWrapper>
      )}
    </div>
  );
};

export default RecommendationSection;
