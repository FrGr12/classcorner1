
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingRequestsTable from "./BookingRequestsTable";
import ParticipantsTable from "./ParticipantsTable";
import WaitlistTable from "./WaitlistTable";
import { AttendanceTracking } from "@/components/teach/dashboard/AttendanceTracking";

// Add mock data for each table to fix the type errors
const mockParticipants = [
  {
    id: 1,
    name: "Jane Smith",
    email: "jane@example.com",
    status: "confirmed",
    payment_status: "paid",
    booking_date: "2023-06-15"
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@example.com",
    status: "confirmed",
    payment_status: "paid",
    booking_date: "2023-06-16"
  }
];

const mockRequests = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    date: "2023-06-20",
    status: "pending",
    message: "Looking forward to joining the class!"
  },
  {
    id: 2,
    name: "Bob Brown",
    email: "bob@example.com",
    date: "2023-06-21",
    status: "pending",
    message: "I have previous experience with pottery."
  }
];

const mockWaitlistEntries = [
  {
    id: 1,
    name: "Carol White",
    email: "carol@example.com",
    date_added: "2023-06-10",
    position: 1,
    message: "Please let me know if a spot opens up!"
  },
  {
    id: 2,
    name: "David Green",
    email: "david@example.com",
    date_added: "2023-06-11",
    position: 2,
    message: "Very interested in this class."
  }
];

const onStatusUpdate = (id: number, status: string) => {
  console.log(`Status updated for ${id} to ${status}`);
};

const onApprove = (id: number) => {
  console.log(`Request ${id} approved`);
};

const onDeny = (id: number) => {
  console.log(`Request ${id} denied`);
};

const onPromote = (id: number) => {
  console.log(`Waitlist entry ${id} promoted`);
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
