
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface StatsData {
  title: string;
  views: number;
  saves: number;
  ad_clicks: number;
}

const PromotionalStats = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<StatsData[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data, error } = await supabase
          .from('course_promotional_stats')
          .select(`
            views,
            saves,
            ad_clicks,
            courses (
              title
            )
          `);

        if (error) throw error;

        const formattedStats = data.map(stat => ({
          title: stat.courses.title,
          views: stat.views,
          saves: stat.saves,
          ad_clicks: stat.ad_clicks
        }));

        setStats(formattedStats);
      } catch (error) {
        console.error('Error fetching promotional stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-accent-purple" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Promotional Performance</CardTitle>
        <CardDescription>
          Track views, saves, and ad engagement for your classes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="views" fill="#8884d8" name="Views" />
              <Bar dataKey="saves" fill="#82ca9d" name="Saves" />
              <Bar dataKey="ad_clicks" fill="#ffc658" name="Ad Clicks" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PromotionalStats;
