import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

type EngagementData = {
  course_title: string;
  total_bookings: number;
  waitlist_count: number;
};

const EngagementMetrics = () => {
  const [data, setData] = useState<EngagementData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEngagementData();
  }, []);

  const fetchEngagementData = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError("User not authenticated");
        return;
      }

      const { data: courses, error: coursesError } = await supabase
        .from('courses')
        .select(`
          id,
          title,
          bookings (count),
          waitlist_entries (count)
        `)
        .eq('instructor_id', user.id)
        .eq('status', 'published');

      if (coursesError) throw coursesError;

      const formattedData = courses?.map(course => ({
        course_title: course.title,
        total_bookings: course.bookings?.length || 0,
        waitlist_count: course.waitlist_entries?.length || 0
      })) || [];

      setData(formattedData);
    } catch (error: any) {
      setError(error.message);
      console.error('Error fetching engagement data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Course Engagement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[300px]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Course Engagement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[300px] text-destructive">
            {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Engagement</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer
            config={{
              bookings: { color: "#0ea5e9" },
              waitlist: { color: "#f59e0b" }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="course_title" />
                <YAxis />
                <ChartTooltip />
                <Bar dataKey="total_bookings" name="Bookings" fill="var(--color-bookings)" />
                <Bar dataKey="waitlist_count" name="Waitlist" fill="var(--color-waitlist)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default EngagementMetrics;