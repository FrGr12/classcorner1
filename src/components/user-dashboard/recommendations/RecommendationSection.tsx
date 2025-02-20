
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import SectionWrapper from "../overview/SectionWrapper";
import ClassesGrid from "../overview/ClassesGrid";
import type { ClassPreview } from "@/types/class";

const RecommendationSection = () => {
  const [recommendations, setRecommendations] = useState<ClassPreview[]>([]);
  const [alternativeClasses, setAlternativeClasses] = useState<ClassPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const dummyRecommendations: ClassPreview[] = [
    {
      id: 4,
      title: "Digital Photography Masterclass",
      instructor: "Alex Thompson",
      price: 95,
      rating: 4.9,
      images: ["https://images.unsplash.com/photo-1452587925148-ce544e77e70d"],
      level: "Intermediate",
      date: new Date("2024-04-01"),
      city: "Chicago",
      category: "Photography"
    },
    {
      id: 5,
      title: "Floral Design Workshop",
      instructor: "Jessica Lee",
      price: 85,
      rating: 4.8,
      images: ["https://images.unsplash.com/photo-1526047932273-341f2a7631f9"],
      level: "Beginner",
      date: new Date("2024-04-05"),
      city: "Portland",
      category: "Floral Design"
    }
  ];

  const dummyAlternatives: ClassPreview[] = [
    {
      id: 6,
      title: "Oil Painting for Beginners",
      instructor: "Robert Chen",
      price: 78,
      rating: 4.7,
      images: ["https://images.unsplash.com/photo-1579783900882-c0d3dad7b119"],
      level: "Beginner",
      date: new Date("2024-04-10"),
      city: "Seattle",
      category: "Painting"
    },
    {
      id: 7,
      title: "Ceramic Bowl Making",
      instructor: "Maria Garcia",
      price: 82,
      rating: 4.9,
      images: ["https://images.unsplash.com/photo-1565193298357-c394a6bf6519"],
      level: "Beginner",
      date: new Date("2024-04-15"),
      city: "Austin",
      category: "Ceramics"
    }
  ];

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setRecommendations(dummyRecommendations);
        setAlternativeClasses(dummyAlternatives);
      } catch (error) {
        toast({
          title: "Error loading recommendations",
          description: "Please try refreshing the page.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, [toast]);

  if (loading) {
    return (
      <div className="space-y-6">
        <SectionWrapper
          title="Recommended For You"
          viewAllLink="/student-dashboard/recommendations"
        >
          <div className="flex items-center justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </SectionWrapper>
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

      {recommendations.length === 0 && alternativeClasses.length === 0 && !loading && (
        <SectionWrapper 
          title="Recommendations"
          viewAllLink="/student-dashboard/recommendations"
        >
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
