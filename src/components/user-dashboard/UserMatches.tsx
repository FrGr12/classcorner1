
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import MatchPreferencesForm from "./matches/MatchPreferencesForm";
import MatchCard from "./matches/MatchCard";
import type { CourseMatch } from "@/types/course-match";

const UserMatches = () => {
  const [matches, setMatches] = useState<CourseMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "User not authenticated",
        });
        return;
      }

      const { data, error } = await supabase
        .from('course_matches')
        .select(`
          *,
          course:courses(
            id,
            title,
            description,
            location,
            price,
            tags,
            category
          ),
          profile:profiles(first_name, last_name)
        `)
        .order('match_score', { ascending: false })
        .limit(10);

      if (error) throw error;
      setMatches(data as CourseMatch[]);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to fetch matches",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEnableMatching = async (location: string, categories: string[]) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Update user preferences
      const { error: prefError } = await supabase
        .from('user_preferences')
        .upsert({
          id: user.id,
          preferred_location: location,
          interests: categories
        });

      if (prefError) throw prefError;

      toast({
        title: "Success",
        description: "Your preferences have been updated. Calculating matches...",
      });

      // Fetch updated matches
      await fetchMatches();

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update preferences"
      });
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">AI-Powered Course Recommendations</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Find Your Perfect Class</CardTitle>
          </CardHeader>
          <CardContent>
            <MatchPreferencesForm onEnableMatching={handleEnableMatching} />
          </CardContent>
        </Card>

        {matches?.length === 0 ? (
          <Card className="p-6">
            <div className="text-center text-muted-foreground">
              <p>No matches found yet. Try updating your preferences!</p>
            </div>
          </Card>
        ) : (
          matches?.map((match) => (
            <MatchCard
              key={match.id}
              id={match.course.id}
              title={match.course.title}
              instructor={`${match.profile?.first_name || ''} ${match.profile?.last_name || ''}`}
              price={match.course.price}
              rating={4.5} // This should come from the course data
              category={match.course.category}
              isSponsored={false} // This should be determined by the course's sponsored status
              matchScore={match.match_score}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default UserMatches;
