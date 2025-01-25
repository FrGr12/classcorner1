import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { CourseMatch } from "@/types/course-match";

interface MatchesTableProps {
  matches: CourseMatch[];
  onNotify: (match: CourseMatch) => void;
}

const MatchesTable = ({ matches, onNotify }: MatchesTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student</TableHead>
          <TableHead>Course</TableHead>
          <TableHead>Match Score</TableHead>
          <TableHead>Last Notified</TableHead>
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
            <TableCell>{match.course.title}</TableCell>
            <TableCell>{match.match_score}</TableCell>
            <TableCell>
              {match.notified_at ? 
                new Date(match.notified_at).toLocaleDateString() : 
                "Never"
              }
            </TableCell>
            <TableCell>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onNotify(match)}
                disabled={!!match.notified_at}
              >
                <Send className="h-4 w-4 mr-2" />
                Notify
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MatchesTable;