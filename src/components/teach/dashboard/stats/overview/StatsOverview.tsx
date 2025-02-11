
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, DollarSign, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface StatsOverviewProps {
  dateRange: string;
}

interface OverviewStats {
  totalClasses: number;
  totalBookings: number;
  averageRating: number;
  totalRevenue: number;
  reviewCount: number;
}

const StatsOverview = ({ dateRange }: StatsOverviewProps) => {
  const [stats, setStats] = useState<OverviewStats>({
    totalClasses: 0,
    totalBookings: 0,
    averageRating: 0,
    totalRevenue: 0,
    reviewCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Fetch teacher stats
        const { data: statsData } = await supabase
          .from('teacher_metrics')
          .select('*')
          .eq('instructor_id', user.id)
          .single();

        if (statsData) {
          setStats({
            totalClasses: statsData.upcoming_classes || 0,
            totalBookings: statsData.total_students || 0,
            averageRating: statsData.avg_rating || 0,
            totalRevenue: statsData.total_revenue || 0,
            reviewCount: 0, // We'll implement this later
          });
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [dateRange]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Overview</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClasses}</div>
            <p className="text-xs text-muted-foreground">Classes taught to date</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
            <p className="text-xs text-muted-foreground">Students enrolled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.averageRating.toFixed(1)}
              <span className="text-sm font-normal text-muted-foreground ml-1">
                ({stats.reviewCount} reviews)
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Overall rating</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue}</div>
            <p className="text-xs text-muted-foreground">Lifetime earnings</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatsOverview;
