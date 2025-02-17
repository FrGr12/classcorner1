
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { AttendanceRecord, Session } from "@/types/waitlist";

const AttendanceTracking = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<number | null>(null);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    if (selectedSession) {
      fetchAttendanceRecords(selectedSession);
    }
  }, [selectedSession]);

  const fetchSessions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('course_sessions')
        .select(`
          id,
          start_time
        `)
        .order('start_time', { ascending: false });

      if (error) throw error;
      setSessions(data || []);
      if (data && data.length > 0) {
        setSelectedSession(data[0].id);
      }
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

  const fetchAttendanceRecords = async (sessionId: number) => {
    try {
      // First get all bookings for this session
      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select(`
          id,
          student:profiles(first_name, last_name)
        `)
        .eq('session_id', sessionId);

      if (bookingsError) throw bookingsError;

      if (!bookings) return;

      // Then get existing attendance records
      const { data: existingRecords, error: recordsError } = await supabase
        .from('attendance_records')
        .select('*')
        .eq('session_id', sessionId);

      if (recordsError) throw recordsError;

      // Create/map attendance records
      const records: AttendanceRecord[] = bookings.map(booking => {
        const existingRecord = existingRecords?.find(r => r.booking_id === booking.id);
        return {
          id: existingRecord?.id || 0,
          booking_id: booking.id,
          session_id: sessionId,
          attendance_status: (existingRecord?.attendance_status || 'pending') as 'present' | 'absent' | 'pending',
          notes: existingRecord?.notes || null,
          marked_at: existingRecord?.marked_at || null,
          marked_by: existingRecord?.marked_by || null,
          created_at: existingRecord?.created_at || new Date().toISOString(),
          updated_at: existingRecord?.updated_at || new Date().toISOString(),
          booking: {
            student: booking.student
          }
        };
      });

      setAttendanceRecords(records);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateAttendance = async (recordId: number, bookingId: number, status: 'present' | 'absent' | 'pending') => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      if (recordId === 0) {
        // Insert new record
        const { error } = await supabase
          .from('attendance_records')
          .insert([{
            booking_id: bookingId,
            session_id: selectedSession,
            attendance_status: status,
            marked_by: user.id,
            marked_at: new Date().toISOString()
          }]);

        if (error) throw error;
      } else {
        // Update existing record
        const { error } = await supabase
          .from('attendance_records')
          .update({
            attendance_status: status,
            marked_by: user.id,
            marked_at: new Date().toISOString()
          })
          .eq('id', recordId);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "Attendance updated successfully",
      });

      if (selectedSession) {
        fetchAttendanceRecords(selectedSession);
      }
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
        <CardTitle>Attendance Tracking</CardTitle>
        <CardDescription>
          Track student attendance for your sessions
        </CardDescription>
        <div className="mt-4">
          <Select
            value={selectedSession?.toString()}
            onValueChange={(value) => setSelectedSession(Number(value))}
          >
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Select a session" />
            </SelectTrigger>
            <SelectContent>
              {sessions.map((session) => (
                <SelectItem key={session.id} value={session.id.toString()}>
                  {new Date(session.start_time).toLocaleString()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendanceRecords.map((record) => (
              <TableRow key={record.booking_id}>
                <TableCell>
                  {record.booking?.student.first_name} {record.booking?.student.last_name}
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${record.attendance_status === 'present' ? 'bg-green-100 text-green-800' :
                      record.attendance_status === 'absent' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'}`}>
                    {record.attendance_status.charAt(0).toUpperCase() + record.attendance_status.slice(1)}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={record.attendance_status === 'present' ? 'default' : 'outline'}
                      onClick={() => updateAttendance(record.id, record.booking_id, 'present')}
                    >
                      Present
                    </Button>
                    <Button
                      size="sm"
                      variant={record.attendance_status === 'absent' ? 'default' : 'outline'}
                      onClick={() => updateAttendance(record.id, record.booking_id, 'absent')}
                    >
                      Absent
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AttendanceTracking;
