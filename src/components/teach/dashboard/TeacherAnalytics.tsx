import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Users, Star, Calendar, BookOpen, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import EngagementMetrics from "../analytics/EngagementMetrics";
import PerformanceMetrics from "../analytics/PerformanceMetrics";
import RevenueMetrics from "../analytics/RevenueMetrics";
import { DateRangePicker } from "../analytics/DateRangePicker";

const TeacherAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    totalStudents: 0,
    averageRating: 0,
    activeCourses: 0,
    totalRevenue: 0,
    attendanceRate: 0,
    waitlistCount: 0
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch engagement metrics
      const { data: engagementData } = await supabase
        .from('teacher_engagement_metrics')
        .select('*')
        .eq('instructor_id', user.id)
        .single();

      // Fetch revenue insights
      const { data: revenueData } = await supabase
        .from('teacher_revenue_insights')
        .select('*')
        .eq('instructor_id', user.id)
        .single();

      // Fetch active courses
      const { data: coursesData } = await supabase
        .from('courses')
        .select('id')
        .eq('instructor_id', user.id)
        .eq('status', 'published');

      // Fetch waitlist count
      const { data: waitlistData } = await supabase
        .from('waitlist_entries')
        .select('id')
        .in('course_id', (coursesData || []).map(c => c.id))
        .eq('status', 'waiting');

      setAnalyticsData({
        totalStudents: engagementData?.total_students || 0,
        averageRating: Number(engagementData?.avg_rating?.toFixed(1)) || 0,
        activeCourses: (coursesData || []).length,
        totalRevenue: Number(revenueData?.total_revenue?.toFixed(2)) || 0,
        attendanceRate: engagementData ? 
          ((engagementData.attended_students / engagementData.total_students) * 100) || 0 : 0,
        waitlistCount: (waitlistData || []).length
      });
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track your course performance and student engagement
          </p>
        </div>
        <DateRangePicker />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              Enrolled in your courses
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
              Based on student feedback
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.activeCourses}</div>
            <p className="text-xs text-muted-foreground">
              Currently published
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analyticsData.totalRevenue}</div>
            <p className="text-xs text-muted-foreground">
              Lifetime earnings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.attendanceRate}%</div>
            <p className="text-xs text-muted-foreground">
              Average attendance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Waitlist Size</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.waitlistCount}</div>
            <p className="text-xs text-muted-foreground">
              Students waiting
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="engagement" className="space-y-4">
        <TabsList>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>
        <TabsContent value="engagement" className="space-y-4">
          <EngagementMetrics />
        </TabsContent>
        <TabsContent value="performance" className="space-y-4">
          <PerformanceMetrics />
        </TabsContent>
        <TabsContent value="revenue" className="space-y-4">
          <RevenueMetrics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherAnalytics;