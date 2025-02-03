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
import { format } from "date-fns";

interface WaitlistEntry {
  id: number;
  user_id: string;
  created_at: string;
  status: string;
  profile?: {
    first_name: string;
    last_name: string;
  };
  waitlist_position?: number;
}

interface WaitlistTableProps {
  entries: WaitlistEntry[];
  maxSize?: number;
}

const WaitlistTable = ({ entries = [], maxSize }: WaitlistTableProps) => {
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
            {maxSize && ` / ${maxSize}`}
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
            <TableHead>Joined</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>#{entry.waitlist_position || '-'}</TableCell>
              <TableCell>
                {entry.profile ? 
                  `${entry.profile.first_name} ${entry.profile.last_name}` : 
                  "Anonymous User"
                }
              </TableCell>
              <TableCell>{format(new Date(entry.created_at), "MMM d, yyyy")}</TableCell>
              <TableCell>{entry.status}</TableCell>
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