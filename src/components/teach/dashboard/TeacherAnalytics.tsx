import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Star, Calendar } from "lucide-react";
import EngagementMetrics from "../analytics/EngagementMetrics";
import PerformanceMetrics from "../analytics/PerformanceMetrics";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const TeacherAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    totalStudents: 0,
    averageRating: 0,
    activeCourses: 0,
    revenueGrowth: 0
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch total students (unique students from bookings)
      const { data: studentsData } = await supabase
        .from('bookings')
        .select('student_id')
        .eq('status', 'confirmed')
        .in('course_id', 
          supabase
            .from('courses')
            .select('id')
            .eq('instructor_id', user.id)
        );
      
      const uniqueStudents = new Set((studentsData || []).map(b => b.student_id));

      // Fetch average rating
      const { data: ratingsData } = await supabase
        .from('course_reviews')
        .select('rating, course_id')
        .in('course_id',
          supabase
            .from('courses')
            .select('id')
            .eq('instructor_id', user.id)
        );
      
      const avgRating = (ratingsData || []).length 
        ? (ratingsData || []).reduce((sum, review) => sum + (review.rating || 0), 0) / ratingsData.length
        : 0;

      // Fetch active courses
      const { data: coursesData } = await supabase
        .from('courses')
        .select('id')
        .eq('instructor_id', user.id)
        .eq('status', 'published');

      // Calculate revenue growth (comparing current month to previous month)
      const now = new Date();
      const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

      const { data: currentMonthRevenue } = await supabase
        .from('bookings')
        .select('total_price')
        .eq('payment_status', 'paid')
        .in('course_id',
          supabase
            .from('courses')
            .select('id')
            .eq('instructor_id', user.id)
        )
        .gte('created_at', firstDayThisMonth.toISOString());

      const { data: lastMonthRevenue } = await supabase
        .from('bookings')
        .select('total_price')
        .eq('payment_status', 'paid')
        .in('course_id',
          supabase
            .from('courses')
            .select('id')
            .eq('instructor_id', user.id)
        )
        .gte('created_at', firstDayLastMonth.toISOString())
        .lt('created_at', firstDayThisMonth.toISOString());

      const currentMonthTotal = (currentMonthRevenue || []).reduce((sum, booking) => sum + Number(booking.total_price), 0);
      const lastMonthTotal = (lastMonthRevenue || []).reduce((sum, booking) => sum + Number(booking.total_price), 0);
      
      const growthRate = lastMonthTotal === 0 
        ? 100 
        : ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;

      setAnalyticsData({
        totalStudents: uniqueStudents.size,
        averageRating: Number(avgRating.toFixed(1)),
        activeCourses: (coursesData || []).length,
        revenueGrowth: Number(growthRate.toFixed(1))
      });
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Track your course performance and student engagement</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              Unique enrolled students
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.averageRating}</div>
            <p className="text-xs text-muted-foreground">
              Overall course rating
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.activeCourses}</div>
            <p className="text-xs text-muted-foreground">
              Published courses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.revenueGrowth}%</div>
            <p className="text-xs text-muted-foreground">
              Compared to last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <EngagementMetrics />
        <PerformanceMetrics />
      </div>
    </div>
  );
};

export default TeacherAnalytics;