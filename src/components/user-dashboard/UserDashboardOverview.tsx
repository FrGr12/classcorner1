
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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
  const [upcomingClasses, setUpcomingClasses] = useState<ClassPreview[]>([]);
  const [waitlistedClasses, setWaitlistedClasses] = useState<ClassPreview[]>([]);
  const [savedClasses, setSavedClasses] = useState<ClassPreview[]>([]);
  const [pastClasses, setPastClasses] = useState<ClassPreview[]>([]);

  useEffect(() => {
    // Simulate fetching data with dummy content
    const dummyClass: ClassPreview = {
      id: 1,
      title: "Introduction to Pottery",
      instructor: "Sarah Johnson",
      price: 75,
      rating: 4.8,
      images: ["/placeholder.svg"],
      level: "All Levels",
      date: new Date(),
      city: "Stockholm",
      category: "Pottery"
    };

    const dummyWaitlistClass: ClassPreview = {
      id: 2,
      title: "Advanced Baking Techniques",
      instructor: "Michael Chen",
      price: 89,
      rating: 4.9,
      images: ["/placeholder.svg"],
      level: "Intermediate",
      date: new Date(),
      city: "Göteborg",
      category: "Baking"
    };

    const dummySavedClass: ClassPreview = {
      id: 3,
      title: "Watercolor Painting Workshop",
      instructor: "Emma Davis",
      price: 65,
      rating: 4.7,
      images: ["/placeholder.svg"],
      level: "Beginner",
      date: new Date(),
      city: "Malmö",
      category: "Painting & Art"
    };

    const dummyPastClass: ClassPreview = {
      id: 4,
      title: "Candle Making Masterclass",
      instructor: "David Wilson",
      price: 55,
      rating: 4.6,
      images: ["/placeholder.svg"],
      level: "All Levels",
      date: new Date(),
      city: "Uppsala",
      category: "Candle Making"
    };

    setUpcomingClasses([dummyClass]);
    setWaitlistedClasses([dummyWaitlistClass]);
    setSavedClasses([dummySavedClass]);
    setPastClasses([dummyPastClass]);
  }, []);

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
      <h2 className="text-xl font-semibold mb-4 text-left">Your Classes</h2>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {renderClassSection(
          "Upcoming Classes",
          upcomingClasses,
          "No upcoming classes scheduled",
          "/student-dashboard/bookings"
        )}

        {renderClassSection(
          "Waitlisted Classes",
          waitlistedClasses,
          "You're not on any waitlists",
          "/student-dashboard/waitlist"
        )}
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {renderClassSection(
          "Saved Classes",
          savedClasses,
          "No saved classes yet",
          "/student-dashboard/saved"
        )}

        {renderClassSection(
          "Past Classes",
          pastClasses,
          "No past classes",
          "/student-dashboard/bookings"
        )}
      </div>
    </div>
  );
};

export default UserDashboardOverview;
