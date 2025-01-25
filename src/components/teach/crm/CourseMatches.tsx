import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import MatchesTable from "./MatchesTable";
import type { CourseMatch } from "@/types/course-match";

const CourseMatches = () => {
  const [matches, setMatches] = useState<CourseMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('course_matches')
        .select(`
          *,
          course:courses(title),
          profile:profiles(first_name, last_name)
        `)
        .order('match_score', { ascending: false });

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

  const handleNotify = async (match: CourseMatch) => {
    try {
      const { error } = await supabase
        .from('course_matches')
        .update({ notified_at: new Date().toISOString() })
        .eq('id', match.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Notification sent successfully",
      });

      fetchMatches();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to send notification",
      });
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
    <Card>
      <CardHeader>
        <CardTitle>Course Matches</CardTitle>
        <CardDescription>
          View potential participants who match your courses based on their interests
        </CardDescription>
      </CardHeader>
      <CardContent>
        {matches.length === 0 ? (
          <p className="text-center text-neutral-600 py-8">
            No matches found yet. Try adding more tags to your courses to attract interested students.
          </p>
        ) : (
          <MatchesTable matches={matches} onNotify={handleNotify} />
        )}
      </CardContent>
    </Card>
  );
};

export default CourseMatches;