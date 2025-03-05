
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingRequestsTable from "./BookingRequestsTable";
import ParticipantsTable from "./ParticipantsTable";
import WaitlistTable from "./WaitlistTable";
import { AttendanceTracking } from "@/components/teach/dashboard/AttendanceTracking";
import { memo, useCallback } from "react";

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

// Modify the component to avoid using props that might not exist
const ClassesTabs = memo(() => {
  // Define handlers locally without passing them to components
  const handleStatusUpdate = useCallback((participantId: number, status: string) => {
    console.log(`Status updated for ${participantId} to ${status}`);
  }, []);

  const handleApprove = useCallback((id: number) => {
    console.log(`Request ${id} approved`);
  }, []);

  const handleDeny = useCallback((id: number) => {
    console.log(`Request ${id} denied`);
  }, []);

  const handlePromote = useCallback((userId: string) => {
    console.log(`Waitlist entry ${userId} promoted`);
  }, []);

  return (
    <Tabs defaultValue="participants" className="mt-6">
      <TabsList className="w-full max-w-md" aria-label="Class management tabs">
        <TabsTrigger value="participants" className="flex-1">Participants</TabsTrigger>
        <TabsTrigger value="requests" className="flex-1">Requests</TabsTrigger>
        <TabsTrigger value="waitlist" className="flex-1">Waitlist</TabsTrigger>
        <TabsTrigger value="attendance" className="flex-1">Attendance</TabsTrigger>
      </TabsList>
      <TabsContent value="participants" className="mt-6" role="tabpanel">
        <h2 className="sr-only">Participants List</h2>
        <ParticipantsTable participants={mockParticipants} onStatusUpdate={handleStatusUpdate} />
      </TabsContent>
      <TabsContent value="requests" className="mt-6" role="tabpanel">
        <h2 className="sr-only">Booking Requests</h2>
        {/* Use a simplified BookingRequestsTable that doesn't need additional props */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse" aria-label="Booking requests">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2" scope="col">Name</th>
                <th className="text-left p-2" scope="col">Date</th>
                <th className="text-left p-2" scope="col">Status</th>
                <th className="text-left p-2" scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockRequests.map(request => (
                <tr key={request.id} className="border-b">
                  <td className="p-2">{request.name}</td>
                  <td className="p-2">{request.date}</td>
                  <td className="p-2">{request.status}</td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleApprove(request.id)}
                        className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs focus:outline-none focus:ring-2 focus:ring-green-500"
                        aria-label={`Approve request from ${request.name}`}
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleDeny(request.id)}
                        className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
                        aria-label={`Deny request from ${request.name}`}
                      >
                        Deny
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TabsContent>
      <TabsContent value="waitlist" className="mt-6" role="tabpanel">
        <h2 className="sr-only">Waitlist Entries</h2>
        <WaitlistTable entries={mockWaitlistEntries} onPromote={handlePromote} />
      </TabsContent>
      <TabsContent value="attendance" className="mt-6" role="tabpanel">
        <h2 className="sr-only">Attendance Tracking</h2>
        <AttendanceTracking />
      </TabsContent>
    </Tabs>
  );
});

ClassesTabs.displayName = 'ClassesTabs';

export default ClassesTabs;
