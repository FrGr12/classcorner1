
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ClassCard from "@/components/landing/ClassCard";
import { Loader2 } from "lucide-react";
import type { ClassItem } from "@/types/class";

interface InstructorProfile {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export const RecommendationSection = () => {
  const [recommendations, setRecommendations] = useState<ClassItem[]>([]);
  const [alternativeClasses, setAlternativeClasses] = useState<ClassItem[]>([]);
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
        const instructor = item.course.instructor as InstructorProfile;
        return {
          id: item.course.id,
          title: item.course.title,
          instructor: instructor ? `${instructor.first_name} ${instructor.last_name}` : 'Unknown Instructor',
          instructor_id: item.course.instructor_id,
          price: item.course.price,
          rating: 4.5,
          images: item.course.images.map((img: any) => img.image_path),
          level: "All Levels",
          category: item.course.category,
          date: new Date(),
          city: item.course.location,
          instructorEmail: instructor?.email,
          instructorPhone: instructor?.phone
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
          const instructor = course.instructor as InstructorProfile;
          return {
            id: course.id,
            title: course.title,
            instructor: instructor ? `${instructor.first_name} ${instructor.last_name}` : 'Unknown Instructor',
            instructor_id: course.instructor_id,
            price: course.price,
            rating: 4.5,
            images: course.course_images.map((img: any) => img.image_path),
            level: "All Levels",
            category: course.category,
            date: new Date(),
            city: course.location,
            instructorEmail: instructor?.email,
            instructorPhone: instructor?.phone
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
        <Card>
          <CardHeader>
            <CardTitle>Recommended For You</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recommendations.map((recommendation) => (
                <ClassCard key={recommendation.id} {...recommendation} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {alternativeClasses.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Similar Classes You Might Like</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {alternativeClasses.map((classItem) => (
                <ClassCard key={classItem.id} {...classItem} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {recommendations.length === 0 && alternativeClasses.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No recommendations available yet. Try browsing more classes or updating your preferences.</p>
            <Button 
              className="mt-4"
              onClick={() => window.location.href = '/browse'}
            >
              Browse Classes
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RecommendationSection;
