
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ParticipantsList from "./ParticipantsList";
import WaitlistEntries from "./WaitlistEntries";

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

interface ClassDetailsTabsProps {
  participants: Participant[];
  waitlist: WaitlistEntry[];
}

const ClassDetailsTabs = ({ participants, waitlist }: ClassDetailsTabsProps) => {
  return (
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
            <ParticipantsList participants={participants} />
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
            <WaitlistEntries waitlist={waitlist} />
          </TableBody>
        </Table>
      </TabsContent>
    </Tabs>
  );
};

export default ClassDetailsTabs;
