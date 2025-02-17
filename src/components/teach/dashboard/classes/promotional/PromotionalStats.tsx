
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Loader2, AlertCircle, Rocket, ArrowUp, MessageSquare } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PromotionalMetrics {
  date: string;
  views: number;
  ctr: number;
  saves: number;
  bookings: number;
  matches: number;
}

interface ClassOption {
  id: number;
  title: string;
}

const PromotionalStats = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<PromotionalMetrics[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [timeRange, setTimeRange] = useState<string>("7days");
  const [classes, setClasses] = useState<ClassOption[]>([]);

  useEffect(() => {
    const fetchClasses = async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('id, title')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setClasses(data);
      }
    };

    fetchClasses();
  }, []);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        let query = supabase
          .from('course_promotional_stats')
          .select(`
            views,
            saves,
            ad_clicks,
            created_at,
            courses!inner (
              id,
              title,
              bookings:bookings(count)
            )
          `)
          .order('created_at', { ascending: true });

        if (selectedClass !== "all") {
          // Convert selectedClass to number before using in query
          query = query.eq('course_id', parseInt(selectedClass, 10));
        }

        // Add time range filter
        const now = new Date();
        const daysAgo = timeRange === "7days" ? 7 : timeRange === "30days" ? 30 : 90;
        const startDate = new Date(now.setDate(now.getDate() - daysAgo));
        query = query.gte('created_at', startDate.toISOString());

        const { data: promotionalStats, error: statsError } = await query;

        if (statsError) throw statsError;

        const formattedMetrics: PromotionalMetrics[] = promotionalStats.map(stat => {
          const views = stat.views || 0;
          const adClicks = stat.ad_clicks || 0;
          const ctr = views > 0 ? (adClicks / views) * 100 : 0;

          return {
            date: new Date(stat.created_at).toLocaleDateString(),
            views: views,
            ctr: Number(ctr.toFixed(1)),
            saves: stat.saves || 0,
            bookings: stat.courses?.bookings[0]?.count || 0,
            matches: 0
          };
        });

        setMetrics(formattedMetrics);
      } catch (err: any) {
        console.error('Error fetching promotional metrics:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [selectedClass, timeRange]);

  const handleBoost = () => {
    toast.info("Boost feature coming soon!");
  };

  const handleSponsor = () => {
    toast.info("Sponsor feature coming soon!");
  };

  const handleOutreach = () => {
    toast.info("Student outreach feature coming soon!");
  };

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
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-4">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Classes</SelectItem>
                {classes.map((cls) => (
                  <SelectItem key={cls.id} value={cls.id.toString()}>
                    {cls.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleBoost} className="gap-2">
            <Rocket className="h-4 w-4" />
            Boost
          </Button>
          <Button onClick={handleSponsor} className="gap-2">
            <ArrowUp className="h-4 w-4" />
            Sponsor
          </Button>
          <Button onClick={handleOutreach} className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Outreach
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Promotion Overview</CardTitle>
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
