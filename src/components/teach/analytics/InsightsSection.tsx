import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Trophy, TrendingUp, Users, Link, AlertCircle, ArrowUp, MessageSquare, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const InsightsSection = () => {
  const { data: topPerformers, isLoading: loadingPerformers } = useQuery({
    queryKey: ['topPerformers'],
    queryFn: async () => {
      const { data: revenueData } = await supabase
        .from('teacher_revenue_insights')
        .select('course_id, title, total_revenue')
        .order('total_revenue', { ascending: false })
        .limit(3);

      const { data: ratingData } = await supabase
        .from('course_reviews')
        .select('course_id, courses(title), rating')
        .order('rating', { ascending: false })
        .limit(3);

      return {
        revenue: revenueData || [],
        ratings: ratingData || []
      };
    }
  });

  const { data: insights } = useQuery({
    queryKey: ['actionableInsights'],
    queryFn: async () => {
      // Get waitlist data
      const { data: waitlistData } = await supabase
        .from('waitlist_entries')
        .select('course_id, courses(title)')
        .eq('status', 'waiting')
        .limit(5);

      // Get low performing courses
      const { data: lowPerforming } = await supabase
        .from('course_reviews')
        .select('course_id, courses(title), rating')
        .lte('rating', 4.0)
        .limit(5);

      // Get search trends
      const { data: searchTrends } = await supabase
        .from('course_matches')
        .select('course_id, courses(title), match_score')
        .gt('match_score', 0)
        .order('match_score', { ascending: false })
        .limit(5);

      return {
        waitlist: waitlistData || [],
        improvements: lowPerforming || [],
        trends: searchTrends || []
      };
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Performance Insights</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top by Revenue</CardTitle>
              <Trophy className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              {topPerformers?.revenue.map((course) => (
                <div key={course.course_id} className="mt-2">
                  <p className="font-medium">{course.title}</p>
                  <p className="text-sm text-muted-foreground">
                    ${course.total_revenue.toFixed(2)}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Booking Sources</CardTitle>
              <Link className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Direct</span>
                  <span className="font-medium">65%</span>
                </div>
                <div className="flex justify-between">
                  <span>Website</span>
                  <span className="font-medium">25%</span>
                </div>
                <div className="flex justify-between">
                  <span>Referrals</span>
                  <span className="font-medium">10%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Student Demographics</CardTitle>
              <Users className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Local</span>
                  <span className="font-medium">70%</span>
                </div>
                <div className="flex justify-between">
                  <span>Regional</span>
                  <span className="font-medium">20%</span>
                </div>
                <div className="flex justify-between">
                  <span>Other</span>
                  <span className="font-medium">10%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Actionable Insights</h2>
        <div className="space-y-4">
          {insights?.waitlist?.map((course) => (
            <Alert key={course.course_id}>
              <ArrowUp className="h-4 w-4" />
              <AlertTitle>Optimization Opportunity</AlertTitle>
              <AlertDescription>
                {course.courses.title} has a significant waitlist. Consider adding more sessions
                to accommodate demand.
              </AlertDescription>
            </Alert>
          ))}

          {insights?.improvements?.map((course) => (
            <Alert key={course.course_id} variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Needs Attention</AlertTitle>
              <AlertDescription>
                {course.courses.title} is receiving lower ratings. Consider gathering detailed
                feedback to identify areas for improvement.
              </AlertDescription>
            </Alert>
          ))}

          {insights?.trends?.map((course) => (
            <Alert key={course.course_id} variant="default">
              <Search className="h-4 w-4" />
              <AlertTitle>Search Trend Insight</AlertTitle>
              <AlertDescription>
                {course.courses.title} is frequently appearing in search results and matches.
                Consider optimizing your course description with relevant keywords.
              </AlertDescription>
            </Alert>
          ))}

          <Alert>
            <MessageSquare className="h-4 w-4" />
            <AlertTitle>Student Feedback Highlights</AlertTitle>
            <AlertDescription>
              Recent reviews mention excellent hands-on instruction. Consider incorporating
              more interactive elements in other classes.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default InsightsSection;