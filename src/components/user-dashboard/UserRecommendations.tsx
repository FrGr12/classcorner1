import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ClassItem } from "@/types/class";
import ClassCard from "@/components/landing/ClassCard";
import LoadingState from "./LoadingState";
import { toast } from "sonner";

const UserRecommendations = () => {
  const [recommendations, setRecommendations] = useState<ClassItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: matchedCourses, error } = await supabase
        .from('course_matches')
        .select(`
          courses (
            id,
            title,
            description,
            price,
            location,
            instructor_id,
            course_images (
              image_path
            ),
            profiles (
              first_name,
              last_name
            )
          ),
          match_score,
          interest_score,
          location_score,
          trending_score
        `)
        .eq('user_id', user.id)
        .order('match_score', { ascending: false })
        .limit(6);

      if (error) throw error;

      const formattedRecommendations: ClassItem[] = (matchedCourses || []).map(item => ({
        id: item.courses.id,
        title: item.courses.title,
        description: item.courses.description,
        price: item.courses.price,
        instructor: `${item.courses.profiles[0]?.first_name || ''} ${item.courses.profiles[0]?.last_name || ''}`,
        instructor_id: item.courses.instructor_id,
        rating: 4.5,
        images: item.courses.course_images.map((img: any) => img.image_path),
        level: "All Levels",
        date: new Date(),
        city: item.courses.location,
        matchScore: item.match_score,
        interestScore: item.interest_score,
        locationScore: item.location_score,
        trendingScore: item.trending_score
      }));

      setRecommendations(formattedRecommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      toast.error("Failed to load recommendations");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  const getRecommendationReason = (course: ClassItem & { 
    matchScore?: number;
    interestScore?: number;
    locationScore?: number;
    trendingScore?: number;
  }) => {
    if (course.interestScore && course.interestScore > 20) {
      return "Based on your interests";
    } else if (course.locationScore && course.locationScore > 15) {
      return "Near you";
    } else if (course.trendingScore && course.trendingScore > 30) {
      return "Popular in your area";
    }
    return "You might like this";
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">Recommended for You</h2>
          <p className="text-sm text-muted-foreground">
            Based on your interests and activity
          </p>
        </div>
        <Lightbulb className="w-5 h-5 text-yellow-400" />
      </div>
      {recommendations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map((course) => (
            <div key={course.id} className="relative">
              <div className="absolute top-2 right-2 z-10">
                <span className="bg-accent-purple/90 text-white text-xs px-2 py-1 rounded-full">
                  {getRecommendationReason(course)}
                </span>
              </div>
              <ClassCard {...course} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-neutral-600 text-center py-4">
          No recommendations available yet. Try browsing more classes to get personalized suggestions.
        </p>
      )}
    </Card>
  );
};

export default UserRecommendations;
