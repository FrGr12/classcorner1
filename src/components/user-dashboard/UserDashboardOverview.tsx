import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, CalendarDays, Star, Clock } from "lucide-react";
import TestimonialCard from "@/components/landing/class-card/TestimonialCard";
import NotificationCenter from "@/components/notifications/NotificationCenter";
import ClassCard from "@/components/landing/ClassCard";

interface ClassPreview {
  id: number;
  title: string;
  instructor: string;
  price: number;
  rating: number;
  images: string[];
  level: string;
  date: Date;
  city: string;
  category?: string;
}

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
  const [upcomingClasses, setUpcomingClasses] = useState<ClassPreview[]>([]);
  const [savedClasses, setSavedClasses] = useState<ClassPreview[]>([]);
  const [waitlistedClasses, setWaitlistedClasses] = useState<ClassPreview[]>([]);
  const [matchedClasses, setMatchedClasses] = useState<ClassPreview[]>([]);

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

      // Map the database fields to our state fields
      setMetrics({
        totalClasses: metricsData?.total_classes_attended || 0,
        upcomingBookings: metricsData?.upcoming_classes || 0,
        averageRating: metricsData?.average_rating || 0,
        waitlistCount: 0 // This will be updated when we add waitlist functionality
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
          course_id,
          courses:course_id (
            id,
            title,
            price,
            location,
            instructor:profiles!instructor_id (
              first_name,
              last_name
            ),
            images:course_images(image_path)
          ),
          session:course_sessions!inner (
            start_time
          )
        `)
        .eq('student_id', user.id)
        .eq('status', 'confirmed')
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;

      const formattedClasses = data.map(booking => ({
        id: booking.courses.id,
        title: booking.courses.title,
        instructor: `${booking.courses.instructor.first_name} ${booking.courses.instructor.last_name}`,
        price: booking.courses.price,
        rating: 4.5,
        images: booking.courses.images.map((img: any) => img.image_path),
        level: "All Levels",
        date: new Date(booking.session.start_time),
        city: booking.courses.location
      }));

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
          course_id,
          courses (
            id,
            title,
            price,
            location,
            instructor:profiles!instructor_id (
              first_name,
              last_name
            ),
            images:course_images(image_path)
          )
        `)
        .eq('user_id', user.id)
        .eq('status', 'waiting')
        .limit(3);

      if (error) throw error;

      const formattedClasses = data.map(entry => ({
        id: entry.courses.id,
        title: entry.courses.title,
        instructor: `${entry.courses.instructor.first_name} ${entry.courses.instructor.last_name}`,
        price: entry.courses.price,
        rating: 4.5,
        images: entry.courses.images.map((img: any) => img.image_path),
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
          course_id,
          courses (
            id,
            title,
            price,
            location,
            instructor_id,
            images:course_images(image_path),
            profiles:instructor_id (
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
        instructor: `${match.courses.profiles.first_name} ${match.courses.profiles.last_name}`,
        price: match.courses.price,
        rating: 4.5,
        images: match.courses.images.map((img: any) => img.image_path),
        level: "All Levels",
        date: new Date(),
        city: match.courses.location
      }));

      setMatchedClasses(formattedClasses);
    } catch (error) {
      console.error('Error fetching matched classes:', error);
    }
  };

  const renderClassSection = (
    title: string,
    classes: ClassPreview[],
    emptyMessage: string,
    viewAllPath: string
  ) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Button 
          variant="ghost" 
          className="text-accent-purple"
          onClick={() => navigate(viewAllPath)}
        >
          View All
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {classes.length > 0 ? (
          classes.map(classItem => (
            <ClassCard key={classItem.id} {...classItem} />
          ))
        ) : (
          <p className="text-muted-foreground text-center py-4">
            {emptyMessage}
          </p>
        )}
      </CardContent>
    </Card>
  );

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

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Notifications</CardTitle>
            <Button 
              variant="ghost" 
              className="text-accent-purple"
              onClick={() => navigate("/student-dashboard/notifications")}
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <NotificationCenter limit={5} />
          </CardContent>
        </Card>

        {renderClassSection(
          "Upcoming Classes",
          upcomingClasses,
          "No upcoming classes scheduled",
          "/student-dashboard/bookings"
        )}
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {renderClassSection(
          "Waitlisted Classes",
          waitlistedClasses,
          "You're not on any waitlists",
          "/student-dashboard/waitlist"
        )}

        {renderClassSection(
          "Saved Classes",
          savedClasses,
          "No saved classes yet",
          "/student-dashboard/saved"
        )}
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {renderClassSection(
          "Recommended Classes",
          matchedClasses,
          "No recommendations yet",
          "/student-dashboard/matches"
        )}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Reviews</CardTitle>
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
            <div className="grid grid-cols-1 gap-4">
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
                <p className="text-muted-foreground text-center py-8">
                  No reviews yet. After taking classes, your reviews will appear here.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboardOverview;
