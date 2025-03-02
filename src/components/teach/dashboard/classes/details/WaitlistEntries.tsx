
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

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

interface WaitlistEntriesProps {
  waitlist: WaitlistEntry[];
}

const WaitlistEntries = ({ waitlist }: WaitlistEntriesProps) => {
  if (waitlist.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={4} className="text-center text-muted-foreground">
          No one on the waitlist
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {waitlist.map((entry) => (
        <TableRow key={entry.id}>
          <TableCell>#{entry.position}</TableCell>
          <TableCell>
            {entry.user.first_name} {entry.user.last_name}
          </TableCell>
          <TableCell>{entry.user.email}</TableCell>
          <TableCell>{format(new Date(entry.created_at), 'PPp')}</TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default WaitlistEntries;
