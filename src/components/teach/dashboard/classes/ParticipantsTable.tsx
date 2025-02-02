import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2, Clock, XCircle, Search } from "lucide-react";

interface Participant {
  id: number;
  name: string;
  status: string;
  paymentStatus: string;
}

interface ParticipantsTableProps {
  participants: Participant[];
}

const ParticipantsTable = ({ participants = [] }: ParticipantsTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  if (!participants || participants.length === 0) {
    return (
      <div className="space-y-2">
        <h4 className="font-medium">Participants</h4>
        <p className="text-sm text-muted-foreground">No participants yet</p>
      </div>
    );
  }

  const filteredParticipants = participants.filter(participant =>
    participant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500"><CheckCircle2 className="w-3 h-3 mr-1" /> Confirmed</Badge>;
      case "pending":
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
      case "cancelled":
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" /> Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Participants</h4>
        <div className="relative w-[200px]">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search participants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredParticipants.map((participant) => (
            <TableRow key={participant.id}>
              <TableCell>{participant.name}</TableCell>
              <TableCell>{getStatusBadge(participant.status)}</TableCell>
              <TableCell>
                <Badge variant="outline">{participant.paymentStatus}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ParticipantsTable;