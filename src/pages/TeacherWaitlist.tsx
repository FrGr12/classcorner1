import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import WaitlistTable from "@/components/teach/waitlist/WaitlistTable";
import { WaitlistEntry } from "@/types/waitlist";

const TeacherWaitlist = () => {
  const [waitlistEntries, setWaitlistEntries] = useState<WaitlistEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchWaitlistEntries = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: courses } = await supabase
        .from('courses')
        .select('id')
        .eq('instructor_id', user.id);

      if (!courses || courses.length === 0) {
        setWaitlistEntries([]);
        return;
      }

      const { data, error } = await supabase
        .from('waitlist_entries')
        .select(`
          id,
          course_id,
          session_id,
          user_id,
          status,
          created_at,
          course:courses(title),
          profile:profiles!waitlist_entries_user_id_fkey(first_name, last_name)
        `)
        .eq('status', 'waiting')
        .in('course_id', courses.map(c => c.id));

      if (error) throw error;

      setWaitlistEntries(data as WaitlistEntry[]);
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
          <WaitlistTable 
            entries={waitlistEntries} 
            onStatusUpdate={handleStatusUpdate}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default TeacherWaitlist;