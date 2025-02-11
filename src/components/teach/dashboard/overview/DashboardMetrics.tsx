
import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, DollarSign, Star } from "lucide-react";

interface DashboardMetricsProps {
  metrics: {
    totalStudents: number;
    upcomingClasses: number;
    totalRevenue: number;
    averageRating: number;
  };
}

const DashboardMetrics: FC<DashboardMetricsProps> = ({ metrics }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-left">Highlights</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-accent-purple text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalStudents}</div>
            <p className="text-xs opacity-90">Active enrollments</p>
          </CardContent>
        </Card>

        <Card className="bg-accent-purple text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Upcoming Classes</CardTitle>
            <Calendar className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.upcomingClasses}</div>
            <p className="text-xs opacity-90">Next 7 days</p>
          </CardContent>
        </Card>

        <Card className="bg-accent-purple text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.totalRevenue}</div>
            <p className="text-xs opacity-90">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-accent-purple text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.averageRating.toFixed(1)}</div>
            <p className="text-xs opacity-90">From all reviews</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardMetrics;
