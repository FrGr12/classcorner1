
import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoadingState from "./LoadingState";
import ClassCard from "../landing/ClassCard";
import UserDashboardHeader from "./UserDashboardHeader";

const UserBookings = () => {
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Dummy class data matching landing page format
  const dummyClass = {
    id: 1,
    title: "Introduction to Pottery Making",
    instructor: "Sarah Johnson",
    price: 75,
    rating: 4.8,
    images: ["/placeholder.svg"],
    level: "All Levels",
    date: new Date(),
    city: "Stockholm",
    category: "Pottery",
    groupBookingsEnabled: true,
    privateBookingsEnabled: true,
    basePriceGroup: 65,
    basePricePrivate: 85,
    maxParticipants: 8
  };

  const dummyWaitlistClass = {
    ...dummyClass,
    id: 2,
    title: "Advanced Baking Workshop",
    instructor: "Michael Chen",
    category: "Baking"
  };

  const dummySavedClass = {
    ...dummyClass,
    id: 3,
    title: "Watercolor Painting Basics",
    instructor: "Emma Davis",
    category: "Painting & Art"
  };

  const dummyPastClass = {
    ...dummyClass,
    id: 4,
    title: "Candle Making Masterclass",
    instructor: "David Wilson",
    category: "Candle Making"
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          course:courses(title, location),
          session:course_sessions(start_time)
        `)
        .eq('student_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLoading(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error fetching bookings",
        description: error.message,
      });
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-8">
      <UserDashboardHeader />
      
      <div className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Classes & Bookings</CardTitle>
                <CardDescription>View and manage your class bookings</CardDescription>
              </div>
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Upcoming Classes Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Upcoming Classes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ClassCard {...dummyClass} />
              </div>
            </div>

            {/* Waitlisted Classes Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Waitlisted Classes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ClassCard {...dummyWaitlistClass} />
              </div>
            </div>

            {/* Saved Classes Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Saved Classes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ClassCard {...dummySavedClass} />
              </div>
            </div>

            {/* Past Classes Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Past Classes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ClassCard {...dummyPastClass} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserBookings;
