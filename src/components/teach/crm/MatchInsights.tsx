import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Loader2, Users } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
type CourseInsight = {
  course_id: number;
  course_title: string;
  total_matches: number;
  booking_rate: number;
  waitlist_count: number;
  category: string;
  location: string;
};
const MatchInsights = () => {
  const [insights, setInsights] = useState<CourseInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const {
    toast
  } = useToast();
  useEffect(() => {
    fetchInsights();
  }, []);
  const fetchInsights = async () => {
    try {
      const {
        data: {
          user
        }
      } = await supabase.auth.getUser();
      if (!user) return;
      const {
        data: coursesData,
        error: coursesError
      } = await supabase.from('courses').select(`
          id,
          title,
          category,
          location,
          course_matches (count),
          bookings (count),
          waitlist_entries (count)
        `).eq('instructor_id', user.id).eq('status', 'published');
      if (coursesError) throw coursesError;
      const formattedInsights = coursesData.map(course => ({
        course_id: course.id,
        course_title: course.title,
        total_matches: course.course_matches?.length || 0,
        booking_rate: course.course_matches?.length ? course.bookings?.length / course.course_matches?.length * 100 : 0,
        waitlist_count: course.waitlist_entries?.length || 0,
        category: course.category,
        location: course.location
      }));
      setInsights(formattedInsights);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to fetch insights"
      });
    } finally {
      setLoading(false);
    }
  };
  const handleNotifyMatches = async (courseId: number) => {
    try {
      const {
        data: matches,
        error: matchesError
      } = await supabase.from('course_matches').select('user_id').eq('course_id', courseId).is('notified_at', null);
      if (matchesError) throw matchesError;
      if (matches && matches.length > 0) {
        const {
          error: updateError
        } = await supabase.from('course_matches').update({
          notified_at: new Date().toISOString()
        }).eq('course_id', courseId).is('notified_at', null);
        if (updateError) throw updateError;
        toast({
          title: "Success",
          description: `Notified ${matches.length} potential participants`
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to notify matches"
      });
    }
  };
  if (loading) {
    return <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>;
  }
  return <Card>
      <CardHeader>
        <CardDescription>
          View and manage potential participants based on interests and location
        </CardDescription>
      </CardHeader>
      <CardContent>
        {insights.length === 0 ? <p className="text-center py-[10px] text-sm text-accent-purple">
            No course insights available. Publish courses to see matching data.
          </p> : <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Total Matches</TableHead>
                <TableHead className="text-right">Booking Rate</TableHead>
                <TableHead className="text-right">Waitlist</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {insights.map(insight => <TableRow key={insight.course_id}>
                  <TableCell className="font-medium">
                    {insight.course_title}
                  </TableCell>
                  <TableCell>{insight.category}</TableCell>
                  <TableCell>{insight.location}</TableCell>
                  <TableCell className="text-right">
                    {insight.total_matches}
                  </TableCell>
                  <TableCell className="text-right">
                    {insight.booking_rate.toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-right">
                    {insight.waitlist_count}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleNotifyMatches(insight.course_id)}>
                      Notify Matches
                    </Button>
                  </TableCell>
                </TableRow>)}
            </TableBody>
          </Table>}
      </CardContent>
    </Card>;
};
export default MatchInsights;