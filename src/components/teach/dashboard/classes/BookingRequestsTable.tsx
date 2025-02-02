import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BookingRequest {
  id: number;
  name: string;
  type: string;
  size?: number;
  status: string;
}

interface BookingRequestsTableProps {
  requests: BookingRequest[];
}

const BookingRequestsTable = ({ requests }: BookingRequestsTableProps) => {
  return (
    <div className="space-y-2">
      <h4 className="font-medium">Booking Requests</h4>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.name}</TableCell>
              <TableCell>
                {request.type === 'group' ? `Group (${request.size})` : 'Private'}
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{request.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingRequestsTable;