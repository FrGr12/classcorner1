
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ClassItem } from "@/types/class";
import DashboardMetrics from "./overview/DashboardMetrics";
import ClassSection from "./overview/ClassSection";
import NotificationSection from "./overview/NotificationSection";
import ReviewsSection from "./overview/ReviewsSection";
import UserRecommendations from "./UserRecommendations";

interface BookingData {
  courses: {
    id: number;
    title: string;
    price: number;
    location: string;
    instructor_id: string;
    course_images: {
      image_path: string;
    }[];
    profiles: {
      first_name: string;
      last_name: string;
    }[];
  };
  course_sessions: {
    start_time: string;
  }[];
}

const UserDashboardOverview = () => {
  const { toast } = useToast();
  const [metrics, setMetrics] = useState({
    totalClasses: 0,
    upcomingBookings: 0,
    averageRating: 0,
    waitlistCount: 0
  });

  const [recentReviews, setRecentReviews] = useState<any[]>([]);
  const [upcomingClasses, setUpcomingClasses] = useState<ClassItem[]>([]);
  const [savedClasses, setSavedClasses] = useState<ClassItem[]>([]);
  const [waitlistedClasses, setWaitlistedClasses] = useState<ClassItem[]>([]);
  const [matchedClasses, setMatchedClasses] = useState<ClassItem[]>([]);

  useEffect(() => {
    fetchStudentMetrics();
    fetchRecentReviews();
    fetchUpcomingClasses();
    fetchSavedClasses();
    fetchWaitlistedClasses();
    fetchMatchedClasses();
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

  const fetchSavedClasses = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Implement saved classes fetching when the feature is ready
      setSavedClasses([]);
    } catch (error) {
      console.error('Error fetching saved classes:', error);
    }
  };

  const fetchWaitlistedClasses = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('waitlist_entries')
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
        .eq('status', 'waiting');

      if (error) throw error;

      const formattedClasses = data.map(entry => ({
        id: entry.courses.id,
        title: entry.courses.title,
        instructor: `${entry.courses.profiles[0].first_name} ${entry.courses.profiles[0].last_name}`,
        price: entry.courses.price,
        rating: 4.5,
        images: entry.courses.course_images.map((img: any) => img.image_path),
        level: "All Levels",
        date: new Date(),
        city: entry.courses.location
      }));

      setWaitlistedClasses(formattedClasses);
    } catch (error) {
      console.error('Error fetching waitlisted classes:', error);
    }
  };

  const fetchMatchedClasses = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('course_matches')
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
        .order('match_score', { ascending: false })
        .limit(3);

      if (error) throw error;

      const formattedClasses = data.map(match => ({
        id: match.courses.id,
        title: match.courses.title,
        instructor: `${match.courses.profiles[0].first_name} ${match.courses.profiles[0].last_name}`,
        price: match.courses.price,
        rating: 4.5,
        images: match.courses.course_images.map((img: any) => img.image_path),
        level: "All Levels",
        date: new Date(),
        city: match.courses.location
      }));

      setMatchedClasses(formattedClasses);
    } catch (error) {
      console.error('Error fetching matched classes:', error);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold mb-4 text-left">Highlights</h2>
      
      <DashboardMetrics metrics={metrics} />
      
      <UserRecommendations />

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <NotificationSection />
        <ClassSection
          title="Upcoming Classes"
          classes={upcomingClasses}
          emptyMessage="No upcoming classes scheduled"
          viewAllPath="/student-dashboard/bookings"
        />
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <ClassSection
          title="Waitlisted Classes"
          classes={waitlistedClasses}
          emptyMessage="You're not on any waitlists"
          viewAllPath="/student-dashboard/waitlist"
        />
        <ClassSection
          title="Saved Classes"
          classes={savedClasses}
          emptyMessage="No saved classes yet"
          viewAllPath="/student-dashboard/saved"
        />
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <ClassSection
          title="Recommended Classes"
          classes={matchedClasses}
          emptyMessage="No recommendations yet"
          viewAllPath="/student-dashboard/matches"
        />
        <ReviewsSection reviews={recentReviews} />
      </div>
    </div>
  );
};

export default UserDashboardOverview;
