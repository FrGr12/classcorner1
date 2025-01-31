import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Pencil, Users, Clock, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ClassWithDetails {
  id: number;
  title: string;
  location: string;
  category: string;
  course_sessions: {
    start_time: string;
  }[];
  course_images: {
    image_path: string;
  }[];
  bookings: {
    id: number;
    payment_status: string;
    student: {
      first_name: string;
      last_name: string;
      phone: string;
    } | null;
  }[];
  waitlist_entries: {
    id: number;
    user: {
      first_name: string;
      last_name: string;
    } | null;
  }[];
}

const TeacherClasses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<ClassWithDetails[]>([]);
  const [pastCourses, setPastCourses] = useState<ClassWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const now = new Date().toISOString();

        // Fetch upcoming courses
        const { data: upcomingData, error: upcomingError } = await supabase
          .from("courses")
          .select(`
            id,
            title,
            location,
            category,
            course_sessions (
              start_time
            ),
            course_images (
              image_path
            ),
            bookings (
              id,
              payment_status,
              student:profiles!bookings_student_id_fkey (
                first_name,
                last_name,
                phone
              )
            ),
            waitlist_entries (
              id,
              user:profiles!waitlist_entries_user_id_fkey (
                first_name,
                last_name
              )
            )
          `)
          .eq("instructor_id", user.id)
          .gte("course_sessions.start_time", now)
          .order("course_sessions.start_time");

        if (upcomingError) throw upcomingError;

        // Type assertion after validation
        const typedUpcomingData = (upcomingData || []) as unknown as ClassWithDetails[];
        setCourses(typedUpcomingData);

        // Fetch past courses
        const { data: pastData, error: pastError } = await supabase
          .from("courses")
          .select(`
            id,
            title,
            location,
            category,
            course_sessions (
              start_time
            ),
            course_images (
              image_path
            ),
            bookings (
              id,
              payment_status,
              student:profiles!bookings_student_id_fkey (
                first_name,
                last_name,
                phone
              )
            ),
            waitlist_entries (
              id,
              user:profiles!waitlist_entries_user_id_fkey (
                first_name,
                last_name
              )
            )
          `)
          .eq("instructor_id", user.id)
          .lt("course_sessions.start_time", now)
          .order("course_sessions.start_time", { ascending: false });

        if (pastError) throw pastError;

        // Type assertion after validation
        const typedPastData = (pastData || []) as unknown as ClassWithDetails[];
        setPastCourses(typedPastData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const renderClassTable = (classes: ClassWithDetails[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Class Details</TableHead>
          <TableHead>Date & Time</TableHead>
          <TableHead>Participants</TableHead>
          <TableHead>Waitlist</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {classes.map((course) => (
          <TableRow key={course.id}>
            <TableCell>
              <div className="space-y-1">
                <div className="font-medium">{course.title}</div>
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {course.location}
                </div>
              </div>
            </TableCell>
            <TableCell>
              {course.course_sessions?.[0] && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {format(new Date(course.course_sessions[0].start_time), "PPp")}
                </div>
              )}
            </TableCell>
            <TableCell>
              <div className="space-y-2">
                {course.bookings?.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between gap-2 text-sm">
                    <span>
                      {booking.student ? 
                        `${booking.student.first_name} ${booking.student.last_name}` :
                        'Unknown Student'
                      }
                    </span>
                    <Badge 
                      variant={booking.payment_status === 'paid' ? 'default' : 'destructive'}
                    >
                      {booking.payment_status}
                    </Badge>
                  </div>
                ))}
              </div>
            </TableCell>
            <TableCell>
              {course.waitlist_entries?.length > 0 ? (
                <div className="space-y-1">
                  <Badge variant="secondary" className="mb-2">
                    {course.waitlist_entries.length} on waitlist
                  </Badge>
                  {course.waitlist_entries.map((entry) => (
                    <div key={entry.id} className="text-sm">
                      {entry.user ? 
                        `${entry.user.first_name} ${entry.user.last_name}` :
                        'Unknown User'
                      }
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">No waitlist</span>
              )}
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/teach/edit/${course.id}`)}
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/class/${course.category}/${course.id}`)}
                >
                  View
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Classes</h1>
        <Button onClick={() => navigate("/teach/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Class
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Classes</TabsTrigger>
          <TabsTrigger value="past">Class History</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {courses.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No upcoming classes scheduled
              </CardContent>
            </Card>
          ) : (
            renderClassTable(courses)
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastCourses.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No past classes found
              </CardContent>
            </Card>
          ) : (
            renderClassTable(pastCourses)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherClasses;