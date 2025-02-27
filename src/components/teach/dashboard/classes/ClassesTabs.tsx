
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingRequestsTable from "./BookingRequestsTable";
import ParticipantsTable from "./ParticipantsTable";
import WaitlistTable from "./WaitlistTable";
import { AttendanceTracking } from "@/components/teach/dashboard/AttendanceTracking";

interface Participant {
  id: number;
  name: string;
  email: string;
  status: string;
  paymentStatus: string;
  attendanceStatus?: string;
  booking_date?: string; // Added to match mock data
}

interface BookingRequest {
  id: number;
  name: string;
  type: string;
  size?: number;
  status: string;
  email?: string;
  date?: string;
  message?: string;
}

interface WaitlistEntry {
  id: number;
  user_id: string;
  created_at: string;
  status: string;
  profile?: {
    first_name: string;
    last_name: string;
    email?: string;
  };
  waitlist_position?: number;
  name?: string; // For backward compatibility
  email?: string; // For backward compatibility
  date_added?: string; // For backward compatibility
  position?: number; // For backward compatibility
  message?: string; // For backward compatibility
}

// Add mock data for each table
const mockParticipants: Participant[] = [
  {
    id: 1,
    name: "Jane Smith",
    email: "jane@example.com",
    status: "confirmed",
    paymentStatus: "paid",
    booking_date: "2023-06-15"
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@example.com",
    status: "confirmed",
    paymentStatus: "paid",
    booking_date: "2023-06-16"
  }
];

const mockRequests: BookingRequest[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    date: "2023-06-20",
    status: "pending",
    message: "Looking forward to joining the class!",
    type: "private"
  },
  {
    id: 2,
    name: "Bob Brown",
    email: "bob@example.com",
    date: "2023-06-21",
    status: "pending",
    message: "I have previous experience with pottery.",
    type: "group",
    size: 4
  }
];

const mockWaitlistEntries: WaitlistEntry[] = [
  {
    id: 1,
    user_id: "user1",
    created_at: "2023-06-10T10:00:00Z",
    status: "waiting",
    name: "Carol White",
    email: "carol@example.com",
    date_added: "2023-06-10",
    position: 1,
    message: "Please let me know if a spot opens up!"
  },
  {
    id: 2,
    user_id: "user2",
    created_at: "2023-06-11T10:00:00Z",
    status: "waiting",
    name: "David Green",
    email: "david@example.com",
    date_added: "2023-06-11",
    position: 2,
    message: "Very interested in this class."
  }
];

const onStatusUpdate = (participantId: number, status: string) => {
  console.log(`Status updated for ${participantId} to ${status}`);
};

const onApprove = (id: number) => {
  console.log(`Request ${id} approved`);
};

const onDeny = (id: number) => {
  console.log(`Request ${id} denied`);
};

const onPromote = (userId: string) => {
  console.log(`Waitlist entry ${userId} promoted`);
};

const ClassesTabs = () => {
  return (
    <Tabs defaultValue="participants" className="mt-6">
      <TabsList className="w-full max-w-md">
        <TabsTrigger value="participants" className="flex-1">Participants</TabsTrigger>
        <TabsTrigger value="requests" className="flex-1">Requests</TabsTrigger>
        <TabsTrigger value="waitlist" className="flex-1">Waitlist</TabsTrigger>
        <TabsTrigger value="attendance" className="flex-1">Attendance</TabsTrigger>
      </TabsList>
      <TabsContent value="participants" className="mt-6">
        <ParticipantsTable participants={mockParticipants} onStatusUpdate={onStatusUpdate} />
      </TabsContent>
      <TabsContent value="requests" className="mt-6">
        <BookingRequestsTable requests={mockRequests} onApprove={onApprove} onDeny={onDeny} />
      </TabsContent>
      <TabsContent value="waitlist" className="mt-6">
        <WaitlistTable entries={mockWaitlistEntries} onPromote={onPromote} />
      </TabsContent>
      <TabsContent value="attendance" className="mt-6">
        <AttendanceTracking />
      </TabsContent>
    </Tabs>
  );
};

export default ClassesTabs;
