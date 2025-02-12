
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

const UserBookings = () => {
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Dummy class data for different sections
  const upcomingClass = {
    id: 1,
    title: "Introduction to Pottery Making",
    instructor: "Sarah Johnson",
    price: 75,
    rating: 4.8,
    images: ["/placeholder.svg"],
    level: "All Levels",
    date: new Date(),
    city: "Stockholm",
    category: "Pottery"
  };

  const waitlistClass = {
    id: 2,
    title: "Advanced Baking Workshop",
    instructor: "Michael Chen",
    price: 85,
    rating: 4.9,
    images: ["/placeholder.svg"],
    level: "Advanced",
    date: new Date(),
    city: "Stockholm",
    category: "Baking"
  };

  const savedClass = {
    id: 3,
    title: "Watercolor Painting Basics",
    instructor: "Emma Davis",
    price: 65,
    rating: 4.7,
    images: ["/placeholder.svg"],
    level: "Beginner",
    date: new Date(),
    city: "Stockholm",
    category: "Painting & Art"
  };

  const pastClass = {
    id: 4,
    title: "Candle Making Masterclass",
    instructor: "David Wilson",
    price: 70,
    rating: 4.6,
    images: ["/placeholder.svg"],
    level: "Intermediate",
    date: new Date(),
    city: "Stockholm",
    category: "Candle Making"
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Classes & Bookings</h2>
      </div>
      
      <div className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Your Classes</CardTitle>
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
                <ClassCard {...upcomingClass} />
              </div>
            </div>

            {/* Waitlisted Classes Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Waitlisted Classes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ClassCard {...waitlistClass} />
              </div>
            </div>

            {/* Saved Classes Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Saved Classes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ClassCard {...savedClass} />
              </div>
            </div>

            {/* Past Classes Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Past Classes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ClassCard {...pastClass} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserBookings;
