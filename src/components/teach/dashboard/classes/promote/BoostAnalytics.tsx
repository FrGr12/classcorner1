
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { ArrowUp, Eye, MessageSquare, CreditCard } from "lucide-react";

interface BoostAnalyticsProps {
  boostId: number;
}

interface AnalyticsData {
  views_before: number;
  views_during: number;
  inquiries_before: number;
  inquiries_during: number;
  bookings_before: number;
  bookings_during: number;
  revenue_before: number;
  revenue_during: number;
}

const BoostAnalytics = ({ boostId }: BoostAnalyticsProps) => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data, error } = await supabase
          .from('boost_analytics')
          .select('*')
          .eq('boost_id', boostId)
          .single();

        if (error) throw error;
        setAnalytics(data);
      } catch (error) {
        console.error('Error fetching boost analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [boostId]);

  if (loading) {
    return <div className="animate-pulse">Loading analytics...</div>;
  }

  if (!analytics) {
    return <div>No analytics data available</div>;
  }

  const calculateIncrease = (before: number, during: number) => {
    if (before === 0) return during > 0 ? 100 : 0;
    return Math.round(((during - before) / before) * 100);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Views</CardTitle>
          <Eye className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analytics.views_during}</div>
          <div className="text-xs text-muted-foreground">
            <span className="text-green-500 inline-flex items-center">
              <ArrowUp className="h-4 w-4 mr-1" />
              {calculateIncrease(analytics.views_before, analytics.views_during)}%
            </span>{" "}
            vs. before boost
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Inquiries</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analytics.inquiries_during}</div>
          <div className="text-xs text-muted-foreground">
            <span className="text-green-500 inline-flex items-center">
              <ArrowUp className="h-4 w-4 mr-1" />
              {calculateIncrease(analytics.inquiries_before, analytics.inquiries_during)}%
            </span>{" "}
            vs. before boost
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Bookings</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analytics.bookings_during}</div>
          <div className="text-xs text-muted-foreground">
            <span className="text-green-500 inline-flex items-center">
              <ArrowUp className="h-4 w-4 mr-1" />
              {calculateIncrease(analytics.bookings_before, analytics.bookings_during)}%
            </span>{" "}
            vs. before boost
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${analytics.revenue_during.toFixed(2)}
          </div>
          <div className="text-xs text-muted-foreground">
            <span className="text-green-500 inline-flex items-center">
              <ArrowUp className="h-4 w-4 mr-1" />
              {calculateIncrease(analytics.revenue_before, analytics.revenue_during)}%
            </span>{" "}
            vs. before boost
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BoostAnalytics;
