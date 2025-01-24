import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { WaitlistEntry } from "@/types/waitlist";

const TeacherWaitlist = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [waitlistEntries, setWaitlistEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchWaitlistEntries();
  }, []);

  const fetchWaitlistEntries = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // First get all courses for the instructor
      const { data: courses, error: coursesError } = await supabase
        .from('courses')
        .select('*')
        .eq('instructor_id', user.id);

      if (coursesError) throw coursesError;
      setCourses(courses);

      if (!courses.length) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('waitlist_entries')
        .select(`
          *,
          course:courses(title),
          profile:profiles!inner(first_name, last_name)
        `)
        .eq('status', 'waiting')
        .in('course_id', courses.map(c => c.id));

      if (error) throw error;

      setWaitlistEntries(data as WaitlistEntry[]);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Teacher Waitlist</CardTitle>
        <CardDescription>
          View and manage students waiting for your courses
        </CardDescription>
      </CardHeader>
      <CardContent>
        {waitlistEntries.length === 0 ? (
          <p className="text-center text-neutral-600 py-8">
            No students are currently on the waitlist.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {waitlistEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>
                    {entry.profile ? 
                      `${entry.profile.first_name} ${entry.profile.last_name}` : 
                      "Anonymous User"
                    }
                  </TableCell>
                  <TableCell>{entry.course.title}</TableCell>
                  <TableCell>{entry.status}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleNotify(entry)}
                    >
                      Notify
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default TeacherWaitlist;
