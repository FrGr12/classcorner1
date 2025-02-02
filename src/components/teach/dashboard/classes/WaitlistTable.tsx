import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { UserPlus, ArrowUp } from "lucide-react";

interface WaitlistEntry {
  id: number;
  name: string;
  position: number;
}

interface WaitlistTableProps {
  entries: WaitlistEntry[];
}

const WaitlistTable = ({ entries = [] }: WaitlistTableProps) => {
  if (entries.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        No one is currently on the waitlist
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <UserPlus className="h-3 w-3" />
            {entries.length} {entries.length === 1 ? 'person' : 'people'}
          </Badge>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Auto-promote</span>
            <Switch />
          </div>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Position</TableHead>
            <TableHead>Name</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((person) => (
            <TableRow key={person.id}>
              <TableCell>#{person.position}</TableCell>
              <TableCell>{person.name}</TableCell>
              <TableCell>
                <Button size="sm" variant="ghost">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  Promote
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default WaitlistTable;