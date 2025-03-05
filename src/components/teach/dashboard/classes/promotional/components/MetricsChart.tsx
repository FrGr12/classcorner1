import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
interface MetricsChartProps {
  metrics: Array<{
    date: string;
    views: number;
    ctr: number;
    saves: number;
    bookings: number;
    matches: number;
  }>;
}
const MetricsChart = ({
  metrics
}: MetricsChartProps) => {
  return <Card>
      <CardHeader>
        <CardTitle className="text-left">Promotion Overview</CardTitle>
        <CardDescription className="text-left">
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
    </Card>;
};
export default MetricsChart;