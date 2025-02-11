
import { ClassItem } from "@/types/class";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, MessageSquare, Sparkles, ArrowUp } from "lucide-react";
import { format } from "date-fns";

interface ClassesTableProps {
  classes: ClassItem[];
  onAction: (action: string, classId: number) => void;
}

const ClassesTable = ({ classes, onAction }: ClassesTableProps) => {
  const getFormattedDate = (date: Date | Date[]) => {
    if (Array.isArray(date)) {
      return format(date[0], 'PPP');
    }
    return format(date, 'PPP');
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Class Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Capacity</TableHead>
          <TableHead>Attendees</TableHead>
          <TableHead>Waitlist</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {classes.map((classItem) => (
          <TableRow key={classItem.id}>
            <TableCell className="font-medium">{classItem.title}</TableCell>
            <TableCell>{getFormattedDate(classItem.date)}</TableCell>
            <TableCell>{classItem.maxParticipants || '-'}</TableCell>
            <TableCell>0</TableCell>
            <TableCell>0</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onAction('edit', classItem.id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onAction('message', classItem.id)}
                >
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onAction('boost', classItem.id)}
                >
                  <Sparkles className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onAction('promote', classItem.id)}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ClassesTable;
