import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

type PerformanceData = {
  course_title: string;
  average_rating: number;
  review_count: number;
};

const PerformanceMetrics = () => {
  const [data, setData] = useState<PerformanceData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPerformanceData();
  }, []);

  const fetchPerformanceData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: performanceData, error } = await supabase
        .from('courses')
        .select(`
          id,
          title,
          course_reviews (
            rating
          )
        `)
        .eq('instructor_id', user.id)
        .eq('status', 'published');

      if (error) throw error;

      const formattedData = performanceData.map(course => {
        const reviews = course.course_reviews || [];
        const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
        const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

        return {
          course_title: course.title,
          average_rating: Number(averageRating.toFixed(1)),
          review_count: reviews.length
        };
      });

      setData(formattedData);
    } catch (error) {
      console.error('Error fetching performance data:', error);
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
        <CardTitle>Course Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer
            config={{
              rating: { color: "#10b981" }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="course_title" />
                <YAxis domain={[0, 5]} />
                <ChartTooltip />
                <Line 
                  type="monotone" 
                  dataKey="average_rating" 
                  name="Average Rating" 
                  stroke="var(--color-rating)"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetrics;