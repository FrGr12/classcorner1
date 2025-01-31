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
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Bell, BellDot, Info } from "lucide-react";

interface WaitlistEntry {
  id: number;
  course: {
    title: string;
  };
  status: string;
  notification_status: string;
  notification_sent_count: number;
  created_at: string;
  last_notification_sent_at: string | null;
}

const UserWaitlist = () => {
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
          id,
          status,
          notification_status,
          notification_sent_count,
          created_at,
          last_notification_sent_at,
          course:courses(title)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

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
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>My Waitlist</CardTitle>
            <CardDescription>Track your position on course waitlists</CardDescription>
          </div>
          {waitlistEntries.some(entry => entry.notification_status === 'sent') ? (
            <BellDot className="h-6 w-6 text-primary animate-pulse" />
          ) : (
            <Bell className="h-6 w-6 text-muted-foreground" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        {waitlistEntries.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <Info className="h-12 w-12 mx-auto mb-2 text-muted-foreground/50" />
            <p>You're not on any waitlists yet.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Joined On</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Notifications</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {waitlistEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">
                    {entry.course.title}
                  </TableCell>
                  <TableCell>
                    {format(new Date(entry.created_at), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    <Badge variant={entry.status === 'waiting' ? 'secondary' : 'default'}>
                      {entry.status === 'waiting' ? 'Waiting' : 'Notified'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {entry.notification_sent_count > 0 ? (
                      <div className="text-sm">
                        <span className="text-primary font-medium">
                          Spot available!
                        </span>
                        <br />
                        <span className="text-muted-foreground">
                          Notified {format(new Date(entry.last_notification_sent_at!), "MMM d")}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        No notifications yet
                      </span>
                    )}
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

export default UserWaitlist;