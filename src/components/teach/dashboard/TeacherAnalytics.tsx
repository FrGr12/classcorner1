import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from "recharts";
import EngagementMetrics from "../analytics/EngagementMetrics";
import PerformanceMetrics from "../analytics/PerformanceMetrics";

const TeacherAnalytics = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics & Insights</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <EngagementMetrics />
        <PerformanceMetrics />
      </div>
    </div>
  );
};

export default TeacherAnalytics;