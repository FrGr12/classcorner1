
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ClassDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classId: number | null;
}

interface Participant {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  payment_status: string;
  attendance_status: string;
}

interface WaitlistEntry {
  id: number;
  user: {
    first_name: string;
    last_name: string;
    email: string;
  };
  created_at: string;
  position: number;
}

const ClassDetailsDialog = ({ open, onOpenChange, classId }: ClassDetailsDialogProps) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [classDetails, setClassDetails] = useState<any>(null);

  useEffect(() => {
    if (open && classId) {
      fetchClassDetails();
    }
  }, [open, classId]);

  const fetchClassDetails = async () => {
    if (!classId) return;

    // Fetch class participants
    const { data: bookingsData, error: bookingsError } = await supabase
      .from('bookings')
      .select(`
        id,
        payment_status,
        attendance_status,
        profiles:student_id (
          first_name,
          last_name,
          email
        )
      `)
      .eq('course_id', classId);

    if (!bookingsError && bookingsData) {
      const formattedParticipants = bookingsData.map((booking: any) => ({
        id: booking.id,
        first_name: booking.profiles?.first_name || '',
        last_name: booking.profiles?.last_name || '',
        email: booking.profiles?.email || '',
        payment_status: booking.payment_status || 'pending',
        attendance_status: booking.attendance_status || 'pending'
      }));
      setParticipants(formattedParticipants);
    }

    // Fetch waitlist
    const { data: waitlistData, error: waitlistError } = await supabase
      .from('waitlist_entries')
      .select(`
        id,
        created_at,
        waitlist_position,
        profiles:user_id (
          first_name,
          last_name,
          email
        )
      `)
      .eq('course_id', classId)
      .eq('status', 'waiting')
      .order('waitlist_position', { ascending: true });

    if (!waitlistError && waitlistData) {
      setWaitlist(waitlistData.map((entry: any) => ({
        id: entry.id,
        user: {
          first_name: entry.profiles?.first_name || '',
          last_name: entry.profiles?.last_name || '',
          email: entry.profiles?.email || ''
        },
        created_at: entry.created_at,
        position: entry.waitlist_position
      })));
    }

    // Fetch class details
    const { data: classData } = await supabase
      .from('courses')
      .select('*')
      .eq('id', classId)
      .single();

    if (classData) {
      setClassDetails(classData);
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return <Badge className="bg-green-500">Paid</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      default:
        return <Badge variant="destructive">Unpaid</Badge>;
    }
  };

  const getAttendanceStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'present':
        return <Badge className="bg-green-500">Present</Badge>;
      case 'absent':
        return <Badge variant="destructive">Absent</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  if (!classId) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>{classDetails?.title || 'Class Details'}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="participants" className="w-full">
          <TabsList>
            <TabsTrigger value="participants">Participants ({participants.length})</TabsTrigger>
            <TabsTrigger value="waitlist">Waitlist ({waitlist.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="participants">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Payment Status</TableHead>
                  <TableHead>Attendance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {participants.map((participant) => (
                  <TableRow key={participant.id}>
                    <TableCell>
                      {participant.first_name} {participant.last_name}
                    </TableCell>
                    <TableCell>{participant.email}</TableCell>
                    <TableCell>{getPaymentStatusBadge(participant.payment_status)}</TableCell>
                    <TableCell>{getAttendanceStatusBadge(participant.attendance_status)}</TableCell>
                  </TableRow>
                ))}
                {participants.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      No participants yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="waitlist">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Position</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Joined Waitlist</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {waitlist.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>#{entry.position}</TableCell>
                    <TableCell>
                      {entry.user.first_name} {entry.user.last_name}
                    </TableCell>
                    <TableCell>{entry.user.email}</TableCell>
                    <TableCell>{format(new Date(entry.created_at), 'PPp')}</TableCell>
                  </TableRow>
                ))}
                {waitlist.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      No one on the waitlist
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ClassDetailsDialog;
