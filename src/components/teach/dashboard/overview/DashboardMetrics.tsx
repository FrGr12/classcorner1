
import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, DollarSign, Star } from "lucide-react";
import { Link } from "react-router-dom";

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
      <h2 className="text-xl font-semibold mb-4 text-left text-base sm:text-xl">Highlights</h2>
      <div className="grid gap-3 md:gap-4 grid-cols-2 lg:grid-cols-4">
        <Link to="/dashboard/contacts">
          <Card className="bg-accent-purple text-white hover:bg-accent-purple/90 transition-colors cursor-pointer h-[100px] sm:h-[120px]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm sm:text-lg font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold">{metrics.totalStudents}</div>
              <p className="text-[10px] sm:text-xs opacity-90">Active enrollments</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/dashboard/classes">
          <Card className="bg-accent-purple text-white hover:bg-accent-purple/90 transition-colors cursor-pointer h-[100px] sm:h-[120px]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm sm:text-lg font-medium">Upcoming Classes</CardTitle>
              <Calendar className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold">{metrics.upcomingClasses}</div>
              <p className="text-[10px] sm:text-xs opacity-90">Next 7 days</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/dashboard/stats">
          <Card className="bg-accent-purple text-white hover:bg-accent-purple/90 transition-colors cursor-pointer h-[100px] sm:h-[120px]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm sm:text-lg font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold">${metrics.totalRevenue}</div>
              <p className="text-[10px] sm:text-xs opacity-90">This month</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/dashboard/reviews">
          <Card className="bg-accent-purple text-white hover:bg-accent-purple/90 transition-colors cursor-pointer h-[100px] sm:h-[120px]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm sm:text-lg font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold">{metrics.averageRating.toFixed(1)}</div>
              <p className="text-[10px] sm:text-xs opacity-90">From all reviews</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default DashboardMetrics;
