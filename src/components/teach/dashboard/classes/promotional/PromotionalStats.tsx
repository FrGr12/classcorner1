
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PromotionalMetrics {
  date: string;
  views: number;
  ctr: number;
  saves: number;
  bookings: number;
  matches: number;
}

const PromotionalStats = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<PromotionalMetrics[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const { data: promotionalStats, error: statsError } = await supabase
          .from('course_promotional_stats')
          .select(`
            views,
            saves,
            ad_clicks,
            created_at,
            courses!inner (
              title,
              bookings (count)
            )
          `)
          .order('created_at', { ascending: true });

        if (statsError) throw statsError;

        // Transform the data for the chart
        const formattedMetrics = promotionalStats.map(stat => ({
          date: new Date(stat.created_at).toLocaleDateString(),
          views: stat.views || 0,
          ctr: stat.ad_clicks ? ((stat.ad_clicks / stat.views) * 100).toFixed(1) : 0,
          saves: stat.saves || 0,
          bookings: stat.courses.bookings.count || 0,
          matches: 0 // This will be implemented when match data is available
        }));

        setMetrics(formattedMetrics);
      } catch (err: any) {
        console.error('Error fetching promotional metrics:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load promotional metrics: {error}
        </AlertDescription>
      </Alert>
    );
  }

  const recommendations = [];
  if (metrics.length > 0) {
    const latestMetrics = metrics[metrics.length - 1];
    if (latestMetrics.saves > latestMetrics.bookings * 3) {
      recommendations.push(
        "High save-to-booking ratio. Consider sending outreach messages to interested students."
      );
    }
    if (latestMetrics.views > 0 && latestMetrics.ctr < 2) {
      recommendations.push(
        "Low click-through rate. A boost could help improve visibility."
      );
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>
            Track your class engagement and promotional metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="views" stroke="#8884d8" name="Views" />
                <Line type="monotone" dataKey="saves" stroke="#82ca9d" name="Saves" />
                <Line type="monotone" dataKey="bookings" stroke="#ffc658" name="Bookings" />
                <Line type="monotone" dataKey="ctr" stroke="#ff7300" name="CTR %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
            <CardDescription>
              Actionable insights to improve your class performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PromotionalStats;
