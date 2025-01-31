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

  useEffect(() => {
    fetchEngagementData();
  }, []);

  const fetchEngagementData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: courses } = await supabase
        .from('courses')
        .select(`
          id,
          title,
          bookings (count),
          waitlist_entries (count)
        `)
        .eq('instructor_id', user.id)
        .eq('status', 'published');

      if (!courses) return;

      const formattedData = courses.map(course => ({
        course_title: course.title,
        total_bookings: course.bookings?.length || 0,
        waitlist_count: course.waitlist_entries?.length || 0
      }));

      setData(formattedData);
    } catch (error) {
      console.error('Error fetching engagement data:', error);
    } finally {
      setLoading(false);
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