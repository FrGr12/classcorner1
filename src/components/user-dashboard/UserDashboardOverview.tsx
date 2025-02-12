
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, CalendarDays, Star, Clock } from "lucide-react";
import TestimonialCard from "@/components/landing/class-card/TestimonialCard";

const UserDashboardOverview = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [metrics, setMetrics] = useState({
    totalClasses: 0,
    upcomingBookings: 0,
    averageRating: 0,
    waitlistCount: 0
  });

  const [recentReviews, setRecentReviews] = useState<any[]>([]);

  useEffect(() => {
    fetchStudentMetrics();
    fetchRecentReviews();
  }, []);

  const fetchStudentMetrics = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: metricsData, error } = await supabase
        .from('student_metrics')
        .select('*')
        .eq('student_id', user.id)
        .single();

      if (error) throw error;

      setMetrics({
        totalClasses: metricsData?.total_classes_attended || 0,
        upcomingBookings: metricsData?.upcoming_classes || 0,
        averageRating: metricsData?.average_rating || 0,
        waitlistCount: metricsData?.waitlist_count || 0
      });

    } catch (error: any) {
      console.error('Error fetching metrics:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load dashboard metrics"
      });
    }
  };

  const fetchRecentReviews = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: reviews, error } = await supabase
        .from('course_reviews')
        .select(`
          *,
          courses (title)
        `)
        .eq('reviewer_id', user.id)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;

      setRecentReviews(reviews || []);
    } catch (error: any) {
      console.error('Error fetching reviews:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load recent reviews"
      });
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold mb-4 text-left">Highlights</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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

      <section className="w-full">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Your Reviews</CardTitle>
            <Button 
              variant="ghost" 
              className="text-accent-purple"
              onClick={() => navigate("/student-dashboard/reviews")}
            >
              View All Reviews
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentReviews.length > 0 ? (
                recentReviews.map((review) => (
                  <TestimonialCard
                    key={review.id}
                    name={review.courses.title}
                    date={new Date(review.created_at).toLocaleDateString()}
                    rating={review.rating}
                    comment={review.review_text}
                    avatarUrl={null}
                  />
                ))
              ) : (
                <p className="text-muted-foreground col-span-3 text-center py-8">
                  No reviews yet. After taking classes, your reviews will appear here.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default UserDashboardOverview;
