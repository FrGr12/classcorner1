
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
    title: "Wheel Throwing Workshop",
    instructor: "Michael Chen",
    price: 90,
    rating: 4.9,
    images: ["/placeholder.svg"],
    level: "All Levels",
    date: [new Date("2024-02-20"), new Date("2024-02-27")],
    city: "Manchester",
    category: "Pottery",
    groupBookingsEnabled: true,
    privateBookingsEnabled: true,
    basePriceGroup: 90,
    basePricePrivate: 120,
    maxParticipants: 8
  };

  const waitlistClass = {
    id: 2,
    title: "Advanced Baking Workshop",
    instructor: "Michael Chen",
    price: 85,
    rating: 4.9,
    images: ["/placeholder.svg"],
    level: "Advanced",
    date: [new Date("2024-02-25"), new Date("2024-03-03")],
    city: "Stockholm",
    category: "Baking",
    groupBookingsEnabled: true,
    privateBookingsEnabled: false,
    basePriceGroup: 85,
    maxParticipants: 6
  };

  const savedClass = {
    id: 3,
    title: "Watercolor Painting Basics",
    instructor: "Emma Davis",
    price: 65,
    rating: 4.7,
    images: ["/placeholder.svg"],
    level: "Beginner",
    date: [new Date("2024-03-01"), new Date("2024-03-08")],
    city: "Stockholm",
    category: "Painting & Art",
    groupBookingsEnabled: true,
    privateBookingsEnabled: true,
    basePriceGroup: 65,
    basePricePrivate: 95,
    maxParticipants: 10
  };

  const pastClass = {
    id: 4,
    title: "Candle Making Masterclass",
    instructor: "David Wilson",
    price: 70,
    rating: 4.6,
    images: ["/placeholder.svg"],
    level: "Intermediate",
    date: [new Date("2024-01-15"), new Date("2024-01-22")],
    city: "Stockholm",
    category: "Candle Making",
    groupBookingsEnabled: true,
    privateBookingsEnabled: true,
    basePriceGroup: 70,
    basePricePrivate: 100,
    maxParticipants: 8
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
        <h2 className="text-xl font-semibold mb-4 text-left">Classes & Bookings</h2>
      </div>
      
      <div className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="text-left">
                <CardTitle>Your Classes</CardTitle>
                <CardDescription>View and manage your class bookings</CardDescription>
              </div>
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Upcoming Classes Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-left">Upcoming Classes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ClassCard {...upcomingClass} />
              </div>
            </div>

            {/* Waitlisted Classes Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-left">Waitlisted Classes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ClassCard {...waitlistClass} />
              </div>
            </div>

            {/* Saved Classes Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-left">Saved Classes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ClassCard {...savedClass} />
              </div>
            </div>

            {/* Past Classes Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-left">Past Classes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
