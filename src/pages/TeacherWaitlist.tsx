
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { WaitlistEntry } from "@/types/waitlist";

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

  const handleNotify = async (entry: WaitlistEntry) => {
    try {
      const { error } = await supabase
        .from('waitlist_entries')
        .update({
          notification_sent_at: new Date().toISOString()
        })
        .eq('id', entry.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Student has been notified",
      });

      fetchWaitlistEntries();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
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
