import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Users, Star, Calendar, BookOpen, DollarSign, Badge } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import EngagementMetrics from "../analytics/EngagementMetrics";
import PerformanceMetrics from "../analytics/PerformanceMetrics";
import RevenueMetrics from "../analytics/RevenueMetrics";
import InsightsSection from "../analytics/InsightsSection";
import { DateRangePicker } from "../analytics/DateRangePicker";

interface Review {
  id: string;
  rating: number;
  review_text: string;
  created_at: string;
  instructor_response: string | null;
  courses: {
    title: string;
  };
}

interface AnalyticsData {
  totalStudents: number;
  averageRating: number;
  activeCourses: number;
  totalRevenue: number;
  attendanceRate: number;
  waitlistCount: number;
}

interface ReviewStats {
  averageRating: number;
  recentReviews: number;
  responseRate: number;
  featuredReviews: number;
  totalReviews: number;
}

const TeacherAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalStudents: 0,
    averageRating: 0,
    activeCourses: 0,
    totalRevenue: 0,
    attendanceRate: 0,
    waitlistCount: 0
  });

  const [reviewStats, setReviewStats] = useState<ReviewStats>({
    averageRating: 0,
    recentReviews: 0,
    responseRate: 0,
    featuredReviews: 0,
    totalReviews: 0
  });

  const [recentReviews, setRecentReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetchAnalytics();
    fetchReviewStats();
    fetchRecentReviews();
  }, []);

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

  const fetchReviewStats = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: reviews } = await supabase
      .from('course_reviews')
      .select('*')
      .eq('instructor_id', user.id);

    if (!reviews) return;

    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0 
      ? reviews.reduce((acc, rev) => acc + rev.rating, 0) / totalReviews 
      : 0;
    
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentReviews = reviews.filter(rev => 
      new Date(rev.created_at) > thirtyDaysAgo
    ).length;

    const responseRate = totalReviews > 0
      ? (reviews.filter(rev => rev.instructor_response !== null).length / totalReviews) * 100
      : 0;
    
    setReviewStats({
      averageRating,
      recentReviews,
      responseRate,
      featuredReviews: 8,
      totalReviews
    });
  };

  const fetchRecentReviews = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: reviews } = await supabase
      .from('course_reviews')
      .select(`
        *,
        courses (title)
      `)
      .eq('instructor_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5);

    setRecentReviews(reviews || []);
  };

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

      <div>
        <h2 className="text-2xl font-bold mb-2">Reviews & Testimonials</h2>
        <p className="text-muted-foreground mb-6">
          View and manage student feedback and testimonials
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reviewStats.averageRating.toFixed(1)}</div>
              <p className="text-xs text-muted-foreground">
                Based on {reviewStats.totalReviews} reviews
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Reviews</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reviewStats.recentReviews}</div>
              <p className="text-xs text-muted-foreground">
                In the last 30 days
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reviewStats.responseRate.toFixed(0)}%</div>
              <p className="text-xs text-muted-foreground">
                Reviews responded to
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Featured Reviews</CardTitle>
              <Badge className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reviewStats.featuredReviews}</div>
              <p className="text-xs text-muted-foreground">
                Currently featured
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{review.courses.title}</span>
                      <div className="px-2 py-1 rounded-full text-xs bg-slate-100">
                        {review.rating}.0
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600">
                    {review.review_text}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="insights" className="space-y-4">
        <TabsList>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>
        <TabsContent value="insights" className="space-y-4">
          <InsightsSection />
        </TabsContent>
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
