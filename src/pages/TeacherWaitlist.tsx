import { useEffect, useState } from "react";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Loader2, UserCheck, UserX } from "lucide-react";

interface WaitlistEntry {
  id: number;
  course_id: number;
  session_id?: number;
  user_id: string;
  status: string;
  created_at: string;
  course: {
    title: string;
  };
  user: {
    first_name: string;
    last_name: string;
  };
}

const TeacherWaitlist = () => {
  const [waitlistEntries, setWaitlistEntries] = useState<WaitlistEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchWaitlistEntries = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('waitlist_entries')
        .select(`
          *,
          course:courses(title),
          user:profiles(first_name, last_name)
        `)
        .eq('status', 'waiting');

      if (error) throw error;
      setWaitlistEntries(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch waitlist entries",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (entryId: number, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('waitlist_entries')
        .update({ status: newStatus })
        .eq('id', entryId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Waitlist entry ${newStatus === 'approved' ? 'approved' : 'rejected'}`,
      });

      // Refresh the list
      fetchWaitlistEntries();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update status",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchWaitlistEntries();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-100">
        <Navigation />
        <main className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Waitlist Management</h1>
        
        {waitlistEntries.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-neutral-600">No waitlist entries found.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Joined On</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {waitlistEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">
                      {entry.course?.title}
                    </TableCell>
                    <TableCell>
                      {entry.user?.first_name} {entry.user?.last_name}
                    </TableCell>
                    <TableCell>
                      {format(new Date(entry.created_at), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleStatusUpdate(entry.id, 'approved')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <UserCheck className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleStatusUpdate(entry.id, 'rejected')}
                        >
                          <UserX className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default TeacherWaitlist;