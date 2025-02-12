
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
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
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  const renderSection = (title: string, emptyMessage: string, link: string, classData?: any) => (
    <Card className="bg-white rounded-lg p-6">
      <div className="flex items-center justify-between mb-8">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <Link 
          to={link} 
          className="text-base text-primary hover:text-primary/80 flex items-center"
        >
          View All
          <ArrowRight className="h-5 w-5 ml-1" />
        </Link>
      </div>
      <CardContent className="p-0">
        {classData ? (
          <ClassCard {...classData} />
        ) : (
          <div className="text-center text-muted-foreground text-lg py-8">
            {emptyMessage}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-left">Classes & Bookings</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {renderSection(
          "Upcoming Classes",
          "No upcoming classes scheduled",
          "/student-dashboard/bookings/upcoming",
          upcomingClass
        )}

        {renderSection(
          "Waitlisted Classes",
          "You're not on any waitlists",
          "/student-dashboard/bookings/waitlist",
          waitlistClass
        )}

        {renderSection(
          "Saved Classes",
          "No saved classes yet",
          "/student-dashboard/bookings/saved",
          savedClass
        )}

        {renderSection(
          "Past Classes",
          "No past classes",
          "/student-dashboard/bookings/past",
          pastClass
        )}
      </div>
    </div>
  );
};

export default UserBookings;
