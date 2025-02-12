
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

  const renderSection = (title: string, description: string, classes: any[], emptyMessage: string) => (
    <Card className="border-none shadow-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="text-left">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {classes.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {classes.map((classItem) => (
              <ClassCard key={classItem.id} {...classItem} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-4">{emptyMessage}</p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4 text-left">Classes & Bookings</h2>
      </div>
      
      <div className="grid gap-6">
        {renderSection(
          "Upcoming Classes",
          "Your confirmed upcoming class bookings",
          [upcomingClass],
          "No upcoming classes scheduled"
        )}

        {renderSection(
          "Waitlisted Classes",
          "Classes you're currently on the waitlist for",
          [waitlistClass],
          "You're not on any waitlists"
        )}

        {renderSection(
          "Saved Classes",
          "Classes you've saved for later",
          [savedClass],
          "No saved classes"
        )}

        {renderSection(
          "Past Classes",
          "Classes you've previously attended",
          [pastClass],
          "No past classes"
        )}
      </div>
    </div>
  );
};

export default UserBookings;
