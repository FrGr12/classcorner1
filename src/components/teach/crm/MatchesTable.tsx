import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import type { CourseMatch } from "@/types/course-match";

interface MatchesTableProps {
  matches: CourseMatch[];
  onNotify: (match: CourseMatch) => Promise<void>;
  notifyingId: number | null;
}

const MatchesTable = ({ matches, onNotify, notifyingId }: MatchesTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student</TableHead>
          <TableHead>Course</TableHead>
          <TableHead>Match Score</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {matches.map((match) => (
          <TableRow key={match.id}>
            <TableCell>
              {match.profile ? 
                `${match.profile.first_name} ${match.profile.last_name}` : 
                "Anonymous User"
              }
            </TableCell>
            <TableCell>{match.course?.title}</TableCell>
            <TableCell>{match.match_score}%</TableCell>
            <TableCell>
              <Badge variant={match.notified_at ? "default" : "secondary"}>
                {match.notified_at ? "Notified" : "Pending"}
              </Badge>
            </TableCell>
            <TableCell>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNotify(match)}
                disabled={!!match.notified_at || notifyingId === match.id}
              >
                {notifyingId === match.id ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Notify"
                )}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MatchesTable;