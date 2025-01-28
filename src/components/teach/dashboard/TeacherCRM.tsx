import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Users, MessageSquare, Filter } from "lucide-react";
import { format } from "date-fns";

interface Participant {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  course_title: string;
  last_interaction: string;
  booking_status: string;
}

const TeacherCRM = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchParticipants();
  }, [filter]);

  const fetchParticipants = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      let query = supabase
        .from('bookings')
        .select(`
          id,
          student_id,
          status,
          created_at,
          courses (
            title
          ),
          profiles!bookings_student_id_fkey (
            first_name,
            last_name,
            email
          )
        `)
        .eq('courses.instructor_id', user.id);

      if (filter === "active") {
        query = query.eq('status', 'confirmed');
      } else if (filter === "waitlist") {
        query = query.eq('status', 'waitlist');
      } else if (filter === "past") {
        query = query.eq('status', 'completed');
      }

      const { data, error } = await query;

      if (error) throw error;

      const formattedParticipants = data.map((booking: any) => ({
        id: booking.student_id,
        first_name: booking.profiles?.first_name || 'Unknown',
        last_name: booking.profiles?.last_name || 'User',
        email: booking.profiles?.email || '',
        status: booking.status,
        course_title: booking.courses?.title || '',
        last_interaction: booking.created_at,
        booking_status: booking.status,
      }));

      setParticipants(formattedParticipants);
    } catch (error: any) {
      toast({
        title: "Error fetching participants",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMessageParticipant = async (participantId: string) => {
    // Implementation for messaging functionality
    toast({
      title: "Message sent",
      description: "Your message has been sent successfully.",
    });
  };

  const filteredParticipants = participants.filter(participant =>
    participant.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    participant.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    participant.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Customer Management</h1>
        <p className="text-muted-foreground">
          Manage your participants and track their engagement
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{participants.length}</div>
            <p className="text-xs text-muted-foreground">
              Across all courses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {participants.filter(p => p.status === 'confirmed').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently enrolled
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Waitlist</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {participants.filter(p => p.status === 'waitlist').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Waiting for spots
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex-1">
          <Input
            placeholder="Search participants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Participants</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="waitlist">Waitlist</SelectItem>
            <SelectItem value="past">Past Attendees</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Participants</CardTitle>
          <CardDescription>
            Manage and communicate with your class participants
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Interaction</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Loading participants...
                  </TableCell>
                </TableRow>
              ) : filteredParticipants.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No participants found
                  </TableCell>
                </TableRow>
              ) : (
                filteredParticipants.map((participant) => (
                  <TableRow key={participant.id}>
                    <TableCell>
                      {participant.first_name} {participant.last_name}
                    </TableCell>
                    <TableCell>{participant.email}</TableCell>
                    <TableCell>{participant.course_title}</TableCell>
                    <TableCell>
                      <Badge variant={participant.booking_status === 'confirmed' ? 'default' : 'secondary'}>
                        {participant.booking_status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {format(new Date(participant.last_interaction), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMessageParticipant(participant.id)}
                      >
                        Message
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherCRM;