import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserPlus } from "lucide-react";

interface WaitlistEntry {
  id: number;
  name: string;
  position: number;
}

interface WaitlistTableProps {
  entries: WaitlistEntry[];
}

const WaitlistTable = ({ entries }: WaitlistTableProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Waitlist</h4>
        <Badge variant="secondary" className="gap-1">
          <UserPlus className="h-3 w-3" />
          {entries.length} people
        </Badge>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Position</TableHead>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((person) => (
            <TableRow key={person.id}>
              <TableCell>#{person.position}</TableCell>
              <TableCell>{person.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default WaitlistTable;