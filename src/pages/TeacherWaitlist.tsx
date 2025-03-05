
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
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

  const toggleAutoPromote = async (courseId: number, currentValue: boolean) => {
    try {
      const { error } = await supabase
        .from('courses')
        .update({
          auto_promote_from_waitlist: !currentValue
        })
        .eq('id', courseId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Auto-promote ${!currentValue ? 'enabled' : 'disabled'} successfully`,
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

  const toggleAutoNotify = async (courseId: number, currentValue: boolean) => {
    try {
      const { error } = await supabase
        .from('courses')
        .update({
          auto_send_waitlist_notification: !currentValue
        })
        .eq('id', courseId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Auto-notify ${!currentValue ? 'enabled' : 'disabled'} successfully`,
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
    <div className="space-y-6">
      {Object.entries(entriesByCourse).map(([courseId, entries]) => (
        <Card key={courseId}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{entries[0].course.title}</CardTitle>
                <CardDescription>
                  {entries.length} student{entries.length !== 1 ? 's' : ''} on waitlist
                </CardDescription>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-end gap-2">
                  <span className="text-sm text-muted-foreground">Auto-promote</span>
                  <Switch
                    checked={entries[0].course.auto_promote_from_waitlist}
                    onCheckedChange={() => toggleAutoPromote(Number(courseId), entries[0].course.auto_promote_from_waitlist)}
                  />
                </div>
                <div className="flex items-center justify-end gap-2">
                  <span className="text-sm text-muted-foreground">Auto-notify</span>
                  <Switch
                    checked={entries[0].course.auto_send_waitlist_notification}
                    onCheckedChange={() => toggleAutoNotify(Number(courseId), entries[0].course.auto_send_waitlist_notification)}
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
                  <TableHead>Action</TableHead>
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
                      {new Date(entry.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {entry.notification_sent_at ? 
                        new Date(entry.notification_sent_at).toLocaleDateString() : 
                        'Never'
                      }
                    </TableCell>
                    <TableCell>
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TeacherWaitlist;
