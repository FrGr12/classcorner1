import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import NotificationCenter from "@/components/notifications/NotificationCenter";
import RecommendationSection from "./recommendations/RecommendationSection";
import MetricsCards from "./overview/MetricsCards";
import SectionWrapper from "./overview/SectionWrapper";
import ReviewsSection from "./overview/ReviewsSection";
import ClassesGrid from "./overview/ClassesGrid";
import { DashboardMetrics } from "@/types/dashboard";
import { ClassPreview } from "@/types/class";

const UserDashboardOverview = () => {
  const { toast } = useToast();
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalClasses: 0,
    upcomingBookings: 0,
    averageRating: 0,
    waitlistCount: 0
  });

  const [recentReviews, setRecentReviews] = useState<any[]>([]);
  const [upcomingClasses, setUpcomingClasses] = useState<ClassPreview[]>([]);
  const [savedClasses, setSavedClasses] = useState<ClassPreview[]>([]);

  useEffect(() => {
    fetchStudentMetrics();
    fetchRecentReviews();
    fetchUpcomingClasses();
    fetchSavedClasses();
  }, []);

  const fetchSavedClasses = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('saved_classes')
        .select(`
          courses (
            id,
            title,
            price,
            location,
            instructor_id,
            course_images (
              image_path
            ),
            profiles (
              first_name,
              last_name
            )
          )
        `)
        .eq('user_id', user.id)
        .limit(3);

      if (error) throw error;

      const formattedClasses = data?.map(item => ({
        id: item.courses.id,
        title: item.courses.title,
        instructor: `${item.courses.profiles[0].first_name} ${item.courses.profiles[0].last_name}`,
        price: item.courses.price,
        rating: 4.5,
        images: item.courses.course_images.map(img => img.image_path),
        level: "All Levels",
        date: new Date(),
        city: item.courses.location
      }));

      setSavedClasses(formattedClasses || []);
    } catch (error) {
      console.error('Error fetching saved classes:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load saved classes"
      });
    }
  };

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
        waitlistCount: 0
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

  const fetchUpcomingClasses = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('bookings')
        .select(`
          courses (
            id,
            title,
            price,
            location,
            instructor_id,
            course_images (
              image_path
            ),
            profiles (
              first_name,
              last_name
            )
          ),
          course_sessions (
            start_time
          )
        `)
        .eq('student_id', user.id)
        .eq('status', 'confirmed')
        .returns<BookingData[]>();

      if (error) throw error;

      const formattedClasses = data.map(booking => {
        const sessionStartTime = booking.course_sessions?.[0]?.start_time;
        if (!sessionStartTime) {
          console.warn('Missing session start time for booking:', booking);
        }

        return {
          id: booking.courses.id,
          title: booking.courses.title,
          instructor: `${booking.courses.profiles[0].first_name} ${booking.courses.profiles[0].last_name}`,
          price: booking.courses.price,
          rating: 4.5,
          images: booking.courses.course_images.map(img => img.image_path),
          level: "All Levels",
          date: sessionStartTime ? new Date(sessionStartTime) : new Date(),
          city: booking.courses.location
        };
      });

      setUpcomingClasses(formattedClasses);
    } catch (error) {
      console.error('Error fetching upcoming classes:', error);
    }
  };

  return (
    <div className="space-y-8">
      <MetricsCards metrics={metrics} />

      <SectionWrapper 
        title="Notifications" 
        viewAllLink="/student-dashboard/notifications"
      >
        <NotificationCenter limit={5} />
      </SectionWrapper>

      <RecommendationSection />

      <SectionWrapper 
        title="Upcoming Classes" 
        viewAllLink="/student-dashboard/bookings"
      >
        <ClassesGrid 
          classes={upcomingClasses} 
          emptyMessage="No upcoming classes scheduled" 
        />
      </SectionWrapper>

      <SectionWrapper 
        title="Saved Classes" 
        viewAllLink="/student-dashboard/saved"
      >
        <ClassesGrid 
          classes={savedClasses} 
          emptyMessage="No saved classes yet" 
        />
      </SectionWrapper>

      <SectionWrapper 
        title="Your Reviews" 
        viewAllLink="/student-dashboard/reviews"
      >
        <ReviewsSection reviews={recentReviews} />
      </SectionWrapper>
    </div>
  );
};

export default UserDashboardOverview;
