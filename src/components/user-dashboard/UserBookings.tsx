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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, MessageSquare, ArrowUp, Share2 } from "lucide-react";
import LoadingState from "./LoadingState";

const UserBookings = () => {
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Dummy class data for different sections
  const upcomingClasses = [
    {
      id: 1,
      title: "Wheel Throwing Workshop",
      instructor: "Michael Chen",
      date: new Date("2024-02-20"),
      capacity: 8,
      attendees: 0,
      waitlist: 0,
      paid: 0,
      price: 90,
      status: "upcoming"
    },
    {
      id: 5,
      title: "Pottery for Beginners",
      instructor: "Sarah Wilson",
      date: new Date("2024-02-22"),
      capacity: 6,
      attendees: 0,
      waitlist: 0,
      paid: 0,
      price: 75,
      status: "upcoming"
    }
  ];

  const waitlistClasses = [
    {
      id: 2,
      title: "Advanced Baking Workshop",
      instructor: "Michael Chen",
      date: new Date("2024-02-25"),
      capacity: 6,
      attendees: 0,
      waitlist: 0,
      paid: 0,
      price: 85,
      status: "upcoming"
    },
    {
      id: 6,
      title: "Sourdough Masterclass",
      instructor: "Lisa Johnson",
      date: new Date("2024-03-05"),
      capacity: 8,
      attendees: 0,
      waitlist: 0,
      paid: 0,
      price: 95,
      status: "upcoming"
    }
  ];

  const savedClasses = [
    {
      id: 3,
      title: "Watercolor Painting Basics",
      instructor: "Emma Davis",
      date: new Date("2024-03-01"),
      capacity: 10,
      attendees: 0,
      waitlist: 0,
      paid: 0,
      price: 65,
      status: "upcoming"
    },
    {
      id: 7,
      title: "Oil Painting Workshop",
      instructor: "Robert Smith",
      date: new Date("2024-03-10"),
      capacity: 8,
      attendees: 0,
      waitlist: 0,
      paid: 0,
      price: 85,
      status: "upcoming"
    }
  ];

  const pastClasses = [
    {
      id: 4,
      title: "Candle Making Masterclass",
      instructor: "David Wilson",
      date: new Date("2024-01-15"),
      capacity: 8,
      attendees: 0,
      waitlist: 0,
      paid: 0,
      price: 70,
      status: "upcoming"
    },
    {
      id: 8,
      title: "Scented Candle Workshop",
      instructor: "Anna Lee",
      date: new Date("2024-01-10"),
      capacity: 6,
      attendees: 0,
      waitlist: 0,
      paid: 0,
      price: 65,
      status: "upcoming"
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleAction = (action: string, classId: number) => {
    switch (action) {
      case "edit":
        toast({
          title: "Edit class",
          description: "Opening class editor..."
        });
        break;
      case "message":
        toast({
          title: "Message teacher",
          description: "Opening message composer..."
        });
        break;
      case "promote":
        toast({
          title: "Promote class",
          description: "Opening promotion options..."
        });
        break;
      case "share":
        toast({
          title: "Share class",
          description: "Opening share options..."
        });
        break;
      default:
        break;
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Classes & Bookings</h2>
          <p className="text-muted-foreground">
            Manage your classes and schedules
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcomingClasses.map((classItem) => (
                <TableRow key={classItem.id}>
                  <TableCell className="font-medium">
                    <Link 
                      to={`/class/${classItem.id}`}
                      className="hover:text-primary transition-colors"
                    >
                      {classItem.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {classItem.date.toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                      {classItem.status}
                    </span>
                  </TableCell>
                  <TableCell>${classItem.price}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleAction("edit", classItem.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleAction("message", classItem.id)}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleAction("promote", classItem.id)}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleAction("share", classItem.id)}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserBookings;
