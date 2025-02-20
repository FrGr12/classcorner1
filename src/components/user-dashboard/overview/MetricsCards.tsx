
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CalendarDays, Star, Clock } from "lucide-react";
import { DashboardMetrics } from "@/types/dashboard";

interface MetricsCardsProps {
  metrics: DashboardMetrics;
}

const MetricsCards = ({ metrics }: MetricsCardsProps) => {
  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
      <Card className="bg-accent-purple text-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Total Classes</CardTitle>
          <CalendarDays className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.totalClasses}</div>
          <p className="text-xs opacity-90">Classes taken</p>
        </CardContent>
      </Card>

      <Card className="bg-accent-purple text-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Upcoming Classes</CardTitle>
          <Users className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.upcomingBookings}</div>
          <p className="text-xs opacity-90">Next 7 days</p>
        </CardContent>
      </Card>

      <Card className="bg-accent-purple text-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Average Rating</CardTitle>
          <Star className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.averageRating.toFixed(1)}</div>
          <p className="text-xs opacity-90">From your reviews</p>
        </CardContent>
      </Card>

      <Card className="bg-accent-purple text-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Waitlist</CardTitle>
          <Clock className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.waitlistCount}</div>
          <p className="text-xs opacity-90">Classes waitlisted</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsCards;
