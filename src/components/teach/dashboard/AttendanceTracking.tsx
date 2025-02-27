
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Session } from "@/types/session";
import { AttendanceRecord } from "@/types/waitlist";
import { Printer, Download, FileText, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const AttendanceTracking = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [selectedAttendee, setSelectedAttendee] = useState<{id: string, name: string} | null>(null);
  const { toast } = useToast();

  // Fetch sessions data
  useEffect(() => {
    // This would be a real API call in production
    const mockSessions = [
      { id: 1, date: "2023-06-15", start_time: "10:00" },
      { id: 2, date: "2023-06-22", start_time: "10:00" },
      { id: 3, date: "2023-06-29", start_time: "10:00" }
    ];
    
    setSessions(mockSessions as Session[]);
    setSelectedSession(mockSessions[0] as Session);
  }, []);

  // Fetch attendance data when session changes
  useEffect(() => {
    if (selectedSession) {
      // This would be a real API call in production
      const mockAttendance = [
        {
          id: 1,
          session_id: selectedSession.id,
          booking_id: 101,
          booking: {
            student: { first_name: "Emma", last_name: "Johnson" }
          },
          attendance_status: "present",
          marked_at: "2023-06-15T10:05:00Z",
          marked_by: "Teacher",
          created_at: "2023-06-14T10:00:00Z"
        },
        {
          id: 2,
          session_id: selectedSession.id,
          booking_id: 102,
          booking: {
            student: { first_name: "James", last_name: "Smith" }
          },
          attendance_status: "absent",
          marked_at: "2023-06-15T10:10:00Z",
          marked_by: "Teacher",
          created_at: "2023-06-14T10:00:00Z"
        },
        {
          id: 3,
          session_id: selectedSession.id,
          booking_id: 103,
          booking: {
            student: { first_name: "Sophia", last_name: "Williams" }
          },
          attendance_status: "",
          created_at: "2023-06-14T10:00:00Z"
        }
      ];
      
      setAttendanceRecords(mockAttendance as AttendanceRecord[]);
    }
  }, [selectedSession]);

  const handleStatusChange = (id: number, status: string) => {
    setAttendanceRecords(prev => 
      prev.map(record => 
        record.id === id 
          ? { ...record, attendance_status: status, marked_at: new Date().toISOString(), marked_by: "Teacher" } 
          : record
      )
    );

    toast({
      title: "Attendance updated",
      description: `Student marked as ${status}`,
    });
  };

  const handleAddNote = (id: string, name: string) => {
    setSelectedAttendee({ id, name });
    setIsDialogOpen(true);
  };

  const saveNote = () => {
    if (selectedAttendee) {
      toast({
        title: "Note added",
        description: `Note added for ${selectedAttendee.name}`,
      });
      setNoteContent("");
      setIsDialogOpen(false);
    }
  };

  const filteredAttendance = attendanceRecords.filter(record => {
    const studentName = `${record.booking?.student.first_name} ${record.booking?.student.last_name}`.toLowerCase();
    return studentName.includes(searchTerm.toLowerCase());
  });

  const downloadAttendance = () => {
    toast({
      title: "Downloading",
      description: "Attendance sheet is being downloaded",
    });
  };

  const printAttendance = () => {
    window.print();
  };

  if (!selectedSession) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg sm:text-xl font-bold">Attendance Tracking</CardTitle>
          <CardDescription>Track and manage student attendance</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden sm:flex"
            onClick={printAttendance}
          >
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={downloadAttendance}
          >
            <Download className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Download</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all-sessions" className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-2 sm:items-center mb-4">
            <TabsList className="mb-2 sm:mb-0">
              <TabsTrigger value="all-sessions">All Sessions</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
            
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 text-sm h-8 sm:h-9"
                />
              </div>
              
              <Select
                value={selectedSession ? selectedSession.id.toString() : ""}
                onValueChange={(value) => {
                  const session = sessions.find(s => s.id === parseInt(value));
                  setSelectedSession(session || null);
                }}
              >
                <SelectTrigger className="w-[180px] h-8 sm:h-9 text-xs sm:text-sm">
                  <SelectValue placeholder="Select session" />
                </SelectTrigger>
                <SelectContent>
                  {sessions.map((session) => (
                    <SelectItem key={session.id} value={session.id.toString()} className="text-xs sm:text-sm">
                      {typeof session.date === 'string' 
                        ? format(new Date(session.date), "MMM d, yyyy") 
                        : format(session.date, "MMM d, yyyy")} - {session.start_time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="all-sessions" className="m-0">
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[30%] text-xs sm:text-sm">Student</TableHead>
                    <TableHead className="w-[15%] text-xs sm:text-sm">Status</TableHead>
                    <TableHead className="w-[20%] text-xs sm:text-sm">Marked By</TableHead>
                    <TableHead className="w-[20%] text-xs sm:text-sm">Time</TableHead>
                    <TableHead className="w-[15%] text-xs sm:text-sm">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAttendance.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4 text-xs sm:text-sm">
                        No attendance records found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAttendance.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium text-xs sm:text-sm">
                          {record.booking?.student.first_name} {record.booking?.student.last_name}
                        </TableCell>
                        <TableCell>
                          <Select
                            value={record.attendance_status || ""}
                            onValueChange={(value) => handleStatusChange(record.id, value)}
                          >
                            <SelectTrigger className="w-[100px] h-7 sm:h-8 text-xs sm:text-sm">
                              <SelectValue placeholder="Mark" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="present" className="text-xs sm:text-sm">Present</SelectItem>
                              <SelectItem value="absent" className="text-xs sm:text-sm">Absent</SelectItem>
                              <SelectItem value="late" className="text-xs sm:text-sm">Late</SelectItem>
                              <SelectItem value="excused" className="text-xs sm:text-sm">Excused</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm">
                          {record.marked_by || "-"}
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm">
                          {record.marked_at 
                            ? format(new Date(record.marked_at), "h:mm a") 
                            : "-"}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAddNote(
                              record.id.toString(),
                              `${record.booking?.student.first_name} ${record.booking?.student.last_name}`
                            )}
                            className="h-8 w-8 p-0"
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="upcoming" className="m-0">
            <div className="text-center py-10 text-muted-foreground">
              <p>Upcoming sessions view content</p>
            </div>
          </TabsContent>
          <TabsContent value="past" className="m-0">
            <div className="text-center py-10 text-muted-foreground">
              <p>Past sessions view content</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Note Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Attendance Note</DialogTitle>
            <DialogDescription>
              Add a note for {selectedAttendee?.name}'s attendance record.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Add your note here..."
              className="min-h-[100px]"
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={saveNote}>Save Note</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
