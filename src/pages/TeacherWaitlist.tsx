
import { useEffect, useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";
import { format } from "date-fns";
import type { WaitlistEntry } from "@/types/waitlist";
import { useNavigate } from "react-router-dom";

const TeacherWaitlist = () => {
  const [waitlistEntries, setWaitlistEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchWaitlistEntries();
    
    // Subscribe to realtime updates
    const channel = supabase
      .channel('waitlist-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'waitlist_entries'
        },
        () => {
          fetchWaitlistEntries();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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
        .eq('status', 'waiting')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWaitlistEntries(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching waitlist",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMessageStudent = (userId: string) => {
    navigate("/dashboard/inbox", { 
      state: { 
        selectedStudent: userId,
        fromWaitlist: true
      }
    });
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Waitlist Management</CardTitle>
        <CardDescription>View and manage students on your class waitlists</CardDescription>
      </CardHeader>
      <CardContent>
        {waitlistEntries.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No students currently on any waitlists
          </div>
        ) : (
          <div className="relative overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Joined On</TableHead>
                  <TableHead>Last Notified</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {waitlistEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">
                      {entry.profile ? `${entry.profile.first_name} ${entry.profile.last_name}` : "Anonymous"}
                    </TableCell>
                    <TableCell>{entry.course.title}</TableCell>
                    <TableCell>#{entry.waitlist_position}</TableCell>
                    <TableCell>
                      {format(new Date(entry.created_at), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      {entry.notification_sent_at 
                        ? format(new Date(entry.notification_sent_at), "MMM d, yyyy")
                        : "Never"}
                    </TableCell>
                    <TableCell>
                      <Badge variant={entry.notification_status === 'sent' ? 'default' : 'secondary'}>
                        {entry.notification_status === 'sent' ? 'Notified' : 'Waiting'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMessageStudent(entry.user_id)}
                        className="bg-accent-purple/10 hover:bg-accent-purple/20 border-accent-purple/20"
                      >
                        <MessageSquare className="h-4 w-4 text-accent-purple" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TeacherWaitlist;
