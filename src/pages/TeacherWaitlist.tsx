
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { UserCheck, Users } from "lucide-react";
import type { WaitlistEntry } from "@/types/waitlist";

const TeacherWaitlist = () => {
  const [waitlistEntries, setWaitlistEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

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
          course:courses(
            title, 
            auto_promote_from_waitlist,
            auto_send_waitlist_notification
          ),
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
          notification_sent_at: new Date().toISOString(),
          notification_status: 'sent'
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

  const handleApprove = async (entry: WaitlistEntry) => {
    try {
      const { error } = await supabase
        .from('waitlist_entries')
        .update({
          status: 'approved',
          notification_status: 'approved'
        })
        .eq('id', entry.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Student has been approved",
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

  // Group entries by course
  const entriesByCourse: { [key: string]: WaitlistEntry[] } = {};
  waitlistEntries.forEach(entry => {
    const courseId = entry.course_id;
    if (!entriesByCourse[courseId]) {
      entriesByCourse[courseId] = [];
    }
    entriesByCourse[courseId].push(entry);
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Waitlist Management</h1>
          <p className="text-muted-foreground">Manage your class waitlists and student notifications.</p>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {waitlistEntries.length} waitlisted {waitlistEntries.length === 1 ? 'student' : 'students'}
          </span>
        </div>
      </div>

      {Object.entries(entriesByCourse).length === 0 ? (
        <Card>
          <CardContent className="py-8">
            <div className="text-center text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No students are currently waitlisted for your classes.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        Object.entries(entriesByCourse).map(([courseId, entries]) => (
          <Card key={courseId}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{entries[0].course.title}</CardTitle>
                  <CardDescription>
                    {entries.length} {entries.length === 1 ? 'student' : 'students'} on waitlist
                  </CardDescription>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-sm text-muted-foreground">Auto-promote</span>
                    <Switch
                      checked={entries[0].course.auto_promote_from_waitlist}
                      onCheckedChange={() => {
                        supabase
                          .from('courses')
                          .update({
                            auto_promote_from_waitlist: !entries[0].course.auto_promote_from_waitlist
                          })
                          .eq('id', courseId)
                          .then(() => {
                            fetchWaitlistEntries();
                            toast({
                              description: `Auto-promote ${!entries[0].course.auto_promote_from_waitlist ? 'enabled' : 'disabled'}`
                            });
                          });
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Position</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Joined On</TableHead>
                    <TableHead>Last Notified</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>#{entry.waitlist_position}</TableCell>
                      <TableCell>
                        {entry.profile ? 
                          `${entry.profile.first_name} ${entry.profile.last_name}` : 
                          "Anonymous User"
                        }
                      </TableCell>
                      <TableCell>
                        {format(new Date(entry.created_at), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        {entry.notification_sent_at ? 
                          format(new Date(entry.notification_sent_at), "MMM d, yyyy") : 
                          'Never'
                        }
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          entry.notification_status === 'sent' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {entry.notification_status === 'sent' ? 'Notified' : 'Waiting'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-green-100 hover:bg-green-200 text-green-800 border-green-200"
                            onClick={() => handleApprove(entry)}
                          >
                            <UserCheck className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleNotify(entry)}
                            disabled={entry.notification_sent_at ? 
                              new Date().getTime() - new Date(entry.notification_sent_at).getTime() < 24 * 60 * 60 * 1000 : 
                              false
                            }
                          >
                            Notify
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default TeacherWaitlist;
