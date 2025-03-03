
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
import { UserPlus, ArrowUp, Clock } from "lucide-react";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { memo } from "react";

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
}

interface WaitlistTableProps {
  entries: WaitlistEntry[];
  maxSize?: number;
  onPromote: (userId: string) => void;
}

const WaitlistTable = memo(({ entries = [], maxSize, onPromote }: WaitlistTableProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'waiting':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" aria-hidden="true" />Waiting</Badge>;
      case 'notified':
        return <Badge variant="secondary">Notified</Badge>;
      case 'promoted':
        return <Badge variant="default">Promoted</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (!entries || entries.length === 0) {
    return (
      <div 
        className="text-sm text-muted-foreground" 
        aria-label="Empty waitlist"
        role="status"
      >
        No one is currently on the waitlist
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Badge variant="secondary" className="gap-1">
          <UserPlus className="h-3 w-3" aria-hidden="true" />
          <span aria-live="polite" aria-atomic="true">
            {entries.length} {entries.length === 1 ? 'person' : 'people'}
            {maxSize && ` / ${maxSize}`}
          </span>
        </Badge>
      </div>

      <div className="overflow-x-auto">
        <Table aria-label="Waitlist entries">
          <TableHeader>
            <TableRow>
              <TableHead scope="col">Position</TableHead>
              <TableHead scope="col">Name</TableHead>
              <TableHead scope="col">Contact</TableHead>
              <TableHead scope="col">Joined</TableHead>
              <TableHead scope="col">Status</TableHead>
              <TableHead scope="col"><span className="sr-only">Actions</span></TableHead>
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
                <TableCell>
                  {entry.profile?.email || "-"}
                </TableCell>
                <TableCell>{format(new Date(entry.created_at), "MMM d, yyyy")}</TableCell>
                <TableCell>{getStatusBadge(entry.status)}</TableCell>
                <TableCell>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        disabled={entry.status === 'promoted'}
                        aria-label={`Promote ${entry.profile?.first_name || 'user'} from waitlist`}
                        className="focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-purple"
                      >
                        <ArrowUp className="h-4 w-4 mr-1" aria-hidden="true" />
                        Promote
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent 
                      aria-labelledby={`promote-dialog-title-${entry.id}`} 
                      aria-describedby={`promote-dialog-description-${entry.id}`}
                    >
                      <AlertDialogHeader>
                        <AlertDialogTitle id={`promote-dialog-title-${entry.id}`}>Promote from Waitlist</AlertDialogTitle>
                        <AlertDialogDescription id={`promote-dialog-description-${entry.id}`}>
                          Are you sure you want to promote this person from the waitlist?
                          They will be notified immediately.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => onPromote(entry.user_id)}>
                          Promote
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
});

WaitlistTable.displayName = 'WaitlistTable';

export default WaitlistTable;
