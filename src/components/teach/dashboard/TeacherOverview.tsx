
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import DashboardMetrics from "./overview/DashboardMetrics";
import BookingsOverview from "./overview/BookingsOverview";
import MessagesOverview from "./overview/MessagesOverview";
import AnalyticsSummary from "./overview/AnalyticsSummary";
import WelcomeHeader from "./overview/WelcomeHeader";
import TestimonialCard from "@/components/landing/class-card/TestimonialCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import MatchInsights from "@/components/teach/crm/MatchInsights";
import LoadingState from "@/components/user-dashboard/LoadingState";

const TeacherOverview = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [metrics, setMetrics] = useState({
    totalStudents: 0,
    upcomingClasses: 0,
    totalRevenue: 0,
    averageRating: 0
  });

  const [recentReviews, setRecentReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);

  useEffect(() => {
    fetchTeacherMetrics();
    fetchRecentReviews();
  }, []);

  const fetchTeacherMetrics = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: metricsData, error } = await supabase
        .from('teacher_metrics')
        .select('*')
        .eq('instructor_id', user.id)
        .single();

      if (error) throw error;

      setMetrics({
        totalStudents: metricsData?.total_students || 0,
        upcomingClasses: metricsData?.upcoming_classes || 0,
        totalRevenue: metricsData?.total_revenue || 0,
        averageRating: metricsData?.avg_rating || 0
      });

    } catch (error: any) {
      console.error('Error fetching metrics:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load dashboard metrics"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRecentReviews = async () => {
    try {
      setIsLoadingReviews(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: reviews, error } = await supabase
        .from('course_reviews')
        .select(`
          *,
          profiles:reviewer_id (first_name, last_name, avatar_url),
          courses (title)
        `)
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
    } finally {
      setIsLoadingReviews(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <LoadingState />
        <LoadingState />
        <LoadingState />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <WelcomeHeader />
      <DashboardMetrics metrics={metrics} />
      
      <section className="grid gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Messages & Notifications</h2>
        </div>
        <MessagesOverview />
      </section>

      <section className="grid gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Course Matches</h2>
          <Button 
            variant="ghost" 
            className="text-accent-purple hover:text-accent-purple/90"
            onClick={() => navigate("/dashboard/classes")}
          >
            View All Matches
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <MatchInsights />
      </section>

      <section className="grid gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Upcoming Classes</h2>
        </div>
        <BookingsOverview />
      </section>

      <section className="grid gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Analytics Summary</h2>
        </div>
        <AnalyticsSummary />
      </section>

      <section className="grid gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Recent Reviews & Testimonials</CardTitle>
            <Button 
              variant="ghost" 
              className="text-accent-purple"
              onClick={() => navigate("/dashboard/reviews")}
            >
              View All Reviews
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            {isLoadingReviews ? (
              <LoadingState />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentReviews.length > 0 ? (
                  recentReviews.map((review) => (
                    <TestimonialCard
                      key={review.id}
                      name={`${review.profiles.first_name} ${review.profiles.last_name}`}
                      date={new Date(review.created_at).toLocaleDateString()}
                      rating={review.rating}
                      comment={review.review_text}
                      avatarUrl={review.profiles.avatar_url}
                    />
                  ))
                ) : (
                  <p className="text-muted-foreground col-span-3 text-center py-8">
                    No reviews yet. As you teach more classes, your students' testimonials will appear here.
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default TeacherOverview;
