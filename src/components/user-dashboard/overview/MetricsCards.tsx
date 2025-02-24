
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CalendarDays, Star, Clock } from "lucide-react";
import { DashboardMetrics } from "@/types/dashboard";
import { Link } from "react-router-dom";

interface MetricsCardsProps {
  metrics: DashboardMetrics;
}

const MetricsCards = ({ metrics }: MetricsCardsProps) => {
  return (
    <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
      <Link to="/student-dashboard/bookings" className="w-full">
        <Card className="bg-accent-purple text-white hover:bg-accent-purple/90 transition-colors cursor-pointer h-[120px]">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-base font-medium">Total Classes</CardTitle>
            <CalendarDays className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{metrics.totalClasses}</div>
            <p className="text-xs opacity-90">Classes taken</p>
          </CardContent>
        </Card>
      </Link>

      <Link to="/student-dashboard/bookings" className="w-full">
        <Card className="bg-accent-purple text-white hover:bg-accent-purple/90 transition-colors cursor-pointer h-[120px]">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-base font-medium">Upcoming Classes</CardTitle>
            <Users className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{metrics.upcomingBookings}</div>
            <p className="text-xs opacity-90">Next 7 days</p>
          </CardContent>
        </Card>
      </Link>

      <Card className="bg-accent-purple text-white h-[120px]">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-base font-medium">Average Rating</CardTitle>
          <Star className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold">{metrics.averageRating.toFixed(1)}</div>
          <p className="text-xs opacity-90">From your reviews</p>
        </CardContent>
      </Card>

      <Link to="/student-dashboard/waitlist" className="w-full">
        <Card className="bg-accent-purple text-white hover:bg-accent-purple/90 transition-colors cursor-pointer h-[120px]">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-base font-medium">Waitlist</CardTitle>
            <Clock className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{metrics.waitlistCount}</div>
            <p className="text-xs opacity-90">Classes waitlisted</p>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default MetricsCards;
