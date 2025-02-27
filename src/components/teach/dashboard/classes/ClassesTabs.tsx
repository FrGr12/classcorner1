
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingRequestsTable from "./BookingRequestsTable";
import ParticipantsTable from "./ParticipantsTable";
import WaitlistTable from "./WaitlistTable";
import { AttendanceTracking } from "@/components/teach/dashboard/AttendanceTracking";

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
        <ParticipantsTable />
      </TabsContent>
      <TabsContent value="requests" className="mt-6">
        <BookingRequestsTable />
      </TabsContent>
      <TabsContent value="waitlist" className="mt-6">
        <WaitlistTable />
      </TabsContent>
      <TabsContent value="attendance" className="mt-6">
        <AttendanceTracking />
      </TabsContent>
    </Tabs>
  );
};

export default ClassesTabs;
