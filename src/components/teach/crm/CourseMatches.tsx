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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";

interface CourseMatch {
  id: number;
  user_id: string;
  course_id: number;
  match_score: number;
  notified_at: string | null;
  created_at: string;
  course: {
    title: string;
  };
  profile: {
    first_name: string;
    last_name: string;
    email?: string;
  } | null;
}

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
        .from("course_matches")
        .select(`
          *,
          course:courses(title),
          profile:profiles(first_name, last_name)
        `)
        .order("match_score", { ascending: false });

      if (error) throw error;

      setMatches(data || []);
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
        .from("course_matches")
        .update({ notified_at: new Date().toISOString() })
        .eq("id", match.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Notification sent successfully",
      });

      // Refresh matches to update UI
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Match Score</TableHead>
                <TableHead>Last Notified</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matches.map((match) => (
                <TableRow key={match.id}>
                  <TableCell>
                    {match.profile ? 
                      `${match.profile.first_name} ${match.profile.last_name}` : 
                      "Anonymous User"
                    }
                  </TableCell>
                  <TableCell>{match.course.title}</TableCell>
                  <TableCell>{match.match_score}</TableCell>
                  <TableCell>
                    {match.notified_at ? 
                      new Date(match.notified_at).toLocaleDateString() : 
                      "Never"
                    }
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleNotify(match)}
                      disabled={!!match.notified_at}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Notify
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseMatches;