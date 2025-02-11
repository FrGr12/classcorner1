
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

  useEffect(() => {
    fetchTeacherMetrics();
    fetchRecentReviews();
  }, []);

  const fetchTeacherMetrics = async () => {
    try {
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
    }
  };

  return (
    <div className="space-y-8">
      <WelcomeHeader />
      <DashboardMetrics metrics={metrics} />
      
      <section className="w-full">
        <h2 className="text-xl font-semibold mb-4 text-left">Messages & Notifications</h2>
        <MessagesOverview />
      </section>

      <section className="w-full">
        <h2 className="text-xl font-semibold mb-4 text-left">Upcoming Classes</h2>
        <BookingsOverview />
      </section>

      <section className="w-full">
        <h2 className="text-xl font-semibold mb-4 text-left">Analytics Summary</h2>
        <AnalyticsSummary />
      </section>

      <section className="w-full">
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
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default TeacherOverview;
