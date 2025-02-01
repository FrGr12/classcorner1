import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

type RevenueData = {
  booking_month: string;
  total_revenue: number;
  total_bookings: number;
};

const RevenueMetrics = () => {
  const [data, setData] = useState<RevenueData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRevenueData();
  }, []);

  const fetchRevenueData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: revenueData } = await supabase
        .from('teacher_revenue_insights')
        .select('booking_month, total_revenue, total_bookings')
        .eq('instructor_id', user.id)
        .order('booking_month', { ascending: true });

      if (revenueData) {
        const formattedData = revenueData.map(item => ({
          booking_month: new Date(item.booking_month).toLocaleDateString('en-US', { 
            month: 'short', 
            year: 'numeric' 
          }),
          total_revenue: Number(item.total_revenue),
          total_bookings: Number(item.total_bookings)
        }));
        setData(formattedData);
      }
    } catch (error) {
      console.error('Error fetching revenue data:', error);
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
        <CardTitle>Revenue Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer
            config={{
              revenue: { color: "#10b981" }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="booking_month" />
                <YAxis />
                <ChartTooltip />
                <Line 
                  type="monotone" 
                  dataKey="total_revenue" 
                  name="Revenue" 
                  stroke="var(--color-revenue)"
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

export default RevenueMetrics;