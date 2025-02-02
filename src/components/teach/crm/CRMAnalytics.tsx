import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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
  ResponsiveContainer,
} from "recharts";

const CRMAnalytics = () => {
  const { data: messageStats } = useQuery({
    queryKey: ["message-stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("communications")
        .select("*")
        .eq("instructor_id", (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;

      // Calculate response times and message counts
      const stats = data.reduce(
        (acc, msg) => {
          acc.totalMessages += 1;
          if (msg.response_time) {
            acc.avgResponseTime =
              (acc.avgResponseTime * (acc.totalResponses - 1) +
                parseInt(msg.response_time as string)) /
              acc.totalResponses;
            acc.totalResponses += 1;
          }
          return acc;
        },
        { totalMessages: 0, totalResponses: 0, avgResponseTime: 0 }
      );

      return stats;
    },
  });

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Message Statistics</CardTitle>
          <CardDescription>Overview of your communication metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium">Total Messages</h4>
              <p className="text-2xl font-bold">
                {messageStats?.totalMessages || 0}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Average Response Time</h4>
              <p className="text-2xl font-bold">
                {Math.round(messageStats?.avgResponseTime || 0)} minutes
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Response Time Trend</CardTitle>
          <CardDescription>
            Average response time over the last 7 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="responseTime" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CRMAnalytics;