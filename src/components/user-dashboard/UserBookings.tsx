
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
import { Badge } from "@/components/ui/badge";
import LoadingState from "./LoadingState";
import ClassCard from "../landing/ClassCard";

const UserBookings = () => {
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Dummy class data for different sections with booking specific information
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
    status: "Confirmed",
    bookingReference: "BOOK-001",
    participants: 2,
    session: new Date("2024-02-20T14:00:00"),
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
    status: "Waitlisted",
    position: 2,
    estimatedAvailability: "March 2024",
    groupBookingsEnabled: true,
    privateBookingsEnabled: false,
    basePriceGroup: 85,
    maxParticipants: 6
  };

  useEffect(() => {
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
        <h2 className="text-xl font-semibold mb-4 text-left">Your Bookings</h2>
      </div>
      
      <div className="mx-auto">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="text-left">
                <CardTitle>Upcoming Classes</CardTitle>
                <CardDescription>Your confirmed and upcoming class bookings</CardDescription>
              </div>
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6">
              <div className="relative">
                <ClassCard {...upcomingClass} />
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-green-500 hover:bg-green-600">
                    {upcomingClass.status}
                  </Badge>
                </div>
                <div className="mt-4 px-4">
                  <div className="text-sm text-muted-foreground">
                    <p>Booking Reference: {upcomingClass.bookingReference}</p>
                    <p>Participants: {upcomingClass.participants}</p>
                    <p>Session: {upcomingClass.session.toLocaleDateString()} at {upcomingClass.session.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm mt-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="text-left">
                <CardTitle>Waitlist</CardTitle>
                <CardDescription>Classes you're currently waitlisted for</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6">
              <div className="relative">
                <ClassCard {...waitlistClass} />
                <div className="absolute top-4 right-4 z-10">
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                    {waitlistClass.status}
                  </Badge>
                </div>
                <div className="mt-4 px-4">
                  <div className="text-sm text-muted-foreground">
                    <p>Waitlist Position: #{waitlistClass.position}</p>
                    <p>Estimated Availability: {waitlistClass.estimatedAvailability}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserBookings;
