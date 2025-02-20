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
import { SavedClassData } from "@/types/saved-classes";
import { BookingData } from "@/types/dashboard";

const UserDashboardOverview = () => {
  const { toast } = useToast();
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalClasses: 12,
    upcomingBookings: 3,
    averageRating: 4.8,
    waitlistCount: 2
  });

  const dummyClasses: ClassPreview[] = [
    {
      id: 1,
      title: "Advanced Pottery Workshop",
      instructor: "Sarah Wilson",
      price: 89,
      rating: 4.8,
      images: ["https://images.unsplash.com/photo-1565193298357-c394a6bf6519"],
      level: "Advanced",
      date: new Date("2024-03-15"),
      city: "San Francisco",
      category: "Pottery"
    },
    {
      id: 2,
      title: "Watercolor Painting Basics",
      instructor: "Michael Chen",
      price: 65,
      rating: 4.9,
      images: ["https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b"],
      level: "Beginner",
      date: new Date("2024-03-20"),
      city: "Los Angeles",
      category: "Painting"
    },
    {
      id: 3,
      title: "Jewelry Making Workshop",
      instructor: "Emma Davis",
      price: 75,
      rating: 4.7,
      images: ["https://images.unsplash.com/photo-1626947346165-4c2288dadc2e"],
      level: "Intermediate",
      date: new Date("2024-03-25"),
      city: "New York",
      category: "Jewelry"
    }
  ];

  const dummyReviews = [
    {
      id: 1,
      courses: { title: "Advanced Pottery Workshop" },
      created_at: "2024-02-15",
      rating: 5,
      review_text: "Amazing class! Sarah is an excellent instructor and I learned so much about advanced pottery techniques."
    },
    {
      id: 2,
      courses: { title: "Watercolor Painting Basics" },
      created_at: "2024-02-10",
      rating: 4,
      review_text: "Great introduction to watercolor painting. Michael explains everything clearly and provides helpful feedback."
    },
    {
      id: 3,
      courses: { title: "Jewelry Making Workshop" },
      created_at: "2024-02-05",
      rating: 5,
      review_text: "Emma is fantastic! The class was well-structured and I created a beautiful piece of jewelry."
    }
  ];

  useEffect(() => {
    setUpcomingClasses(dummyClasses);
    setSavedClasses([...dummyClasses].reverse());
    setRecentReviews(dummyReviews);
  }, []);

  return (
    <div className="space-y-8">
      <MetricsCards metrics={metrics} />

      <SectionWrapper 
        title="Notifications" 
        viewAllLink="/student-dashboard/notifications"
      >
        <NotificationCenter limit={5} />
      </SectionWrapper>

      <SectionWrapper 
        title="Upcoming Classes" 
        viewAllLink="/student-dashboard/bookings"
      >
        <ClassesGrid 
          classes={dummyClasses} 
          emptyMessage="No upcoming classes scheduled" 
        />
      </SectionWrapper>

      <RecommendationSection />

      <SectionWrapper 
        title="Saved Classes" 
        viewAllLink="/student-dashboard/saved"
      >
        <ClassesGrid 
          classes={[...dummyClasses].reverse()} 
          emptyMessage="No saved classes yet" 
        />
      </SectionWrapper>

      <SectionWrapper 
        title="Your Reviews" 
        viewAllLink="/student-dashboard/reviews"
      >
        <ReviewsSection reviews={dummyReviews} />
      </SectionWrapper>
    </div>
  );
};

export default UserDashboardOverview;
