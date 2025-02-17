
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

interface AttendanceRecord {
  id: number;
  booking_id: number;
  session_id: number;
  attendance_status: string;
  notes: string;
  student: {
    first_name: string;
    last_name: string;
  };
  session: {
    start_time: string;
  };
}

interface Session {
  id: number;
  start_time: string;
}

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
      setSessions(data);
      if (data.length > 0) {
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
      const { data, error } = await supabase
        .from('attendance_records')
        .select(`
          *,
          booking:bookings(
            student:profiles(first_name, last_name)
          ),
          session:course_sessions(start_time)
        `)
        .eq('session_id', sessionId);

      if (error) throw error;
      setAttendanceRecords(data as any);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateAttendance = async (recordId: number, status: string) => {
    try {
      const { error } = await supabase
        .from('attendance_records')
        .update({
          attendance_status: status,
          marked_at: new Date().toISOString()
        })
        .eq('id', recordId);

      if (error) throw error;

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
              <TableHead>Session Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendanceRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell>
                  {record.student?.first_name} {record.student?.last_name}
                </TableCell>
                <TableCell>
                  {new Date(record.session.start_time).toLocaleString()}
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
                      onClick={() => updateAttendance(record.id, 'present')}
                    >
                      Present
                    </Button>
                    <Button
                      size="sm"
                      variant={record.attendance_status === 'absent' ? 'default' : 'outline'}
                      onClick={() => updateAttendance(record.id, 'absent')}
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
