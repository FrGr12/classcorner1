import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface WaitlistEntry {
  id: number;
  course: {
    title: string;
  };
  profile: {
    first_name: string;
    last_name: string;
  };
  created_at: string;
  status: string;
}

const TeacherWaitlist = () => {
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

      const { data, error } = await supabase
        .from('waitlist_entries')
        .select(`
          *,
          course:courses(title),
          profile:profiles(first_name, last_name)
        `)
        .eq('status', 'waiting');

      if (error) throw error;
      setWaitlistEntries(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error fetching waitlist",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNotify = async (entryId: number) => {
    try {
      const { error } = await supabase
        .from('waitlist_entries')
        .update({
          notification_sent_at: new Date().toISOString(),
          status: 'notified'
        })
        .eq('id', entryId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Student has been notified",
      });

      fetchWaitlistEntries();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Waitlist Management</CardTitle>
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
                <TableHead>Joined On</TableHead>
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
                  <TableCell>
                    {format(new Date(entry.created_at), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>{entry.status}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleNotify(entry.id)}
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