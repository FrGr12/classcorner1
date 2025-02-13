
import { format } from "date-fns";
import { UserCheck, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { WaitlistEntry } from "@/types/waitlist";

interface WaitlistTableProps {
  entries: WaitlistEntry[];
  onStatusUpdate: (entryId: number, status: string) => Promise<void>;
}

const WaitlistTable = ({ entries, onStatusUpdate }: WaitlistTableProps) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course</TableHead>
            <TableHead>Student</TableHead>
            <TableHead>Joined On</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell className="font-medium">
                {entry.course?.title}
              </TableCell>
              <TableCell>
                {entry.profile ? `${entry.profile.first_name} ${entry.profile.last_name}` : 'Unknown'}
              </TableCell>
              <TableCell>
                {format(new Date(entry.created_at), 'MMM d, yyyy')}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => onStatusUpdate(entry.id, 'approved')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <UserCheck className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onStatusUpdate(entry.id, 'rejected')}
                  >
                    <UserX className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default WaitlistTable;
