
import { ClassItem } from "@/types/class";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { useState } from "react";
import ColumnFilter from "./table/ColumnFilter";
import ClassActions from "./table/ClassActions";
import StatsDisplay from "./table/StatsDisplay";
import PromoteDialog from "./promote/PromoteDialog";
import ClassDetailsDialog from "./ClassDetailsDialog";
import MessageDialog from "./dialogs/MessageDialog";
import ShareDialog from "./dialogs/ShareDialog";
import EditClassDialog from "./dialogs/EditClassDialog";

interface ClassesTableProps {
  classes: ClassItem[];
  onAction: (action: string, classId: number) => void;
}

const ClassesTable = ({ classes, onAction }: ClassesTableProps) => {
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [isPromoteOpen, setIsPromoteOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [filters, setFilters] = useState({
    title: "",
    date: "",
    capacity: "",
    attendees: "",
    waitlist: "",
    paid: "",
  });

  const handleFilter = (column: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [column]: value
    }));
  };

  const formatClassDate = (date: Date | Date[]): string => {
    if (Array.isArray(date)) {
      return date.length > 0 ? format(date[0], 'PPP') : 'No date set';
    }
    return format(date, 'PPP');
  };

  const handleEditSuccess = () => {
    onAction('edit', selectedClassId!);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {Object.keys(filters).map((column) => (
              <TableHead key={column}>
                <ColumnFilter
                  column={column.charAt(0).toUpperCase() + column.slice(1)}
                  value={filters[column as keyof typeof filters]}
                  onChange={(value) => handleFilter(column, value)}
                />
              </TableHead>
            ))}
            <TableHead className="text-center">Views</TableHead>
            <TableHead className="text-center">Saves</TableHead>
            <TableHead className="text-center">Ad Clicks</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classes.map((classItem) => (
            <TableRow 
              key={classItem.id}
              className="cursor-pointer hover:bg-accent/50"
              onClick={() => {
                setSelectedClassId(classItem.id);
                setIsDetailsOpen(true);
              }}
            >
              <TableCell className="font-medium">{classItem.title}</TableCell>
              <TableCell>{formatClassDate(classItem.date)}</TableCell>
              <TableCell>{classItem.maxParticipants || '-'}</TableCell>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
              <StatsDisplay
                views={classItem.views || 0}
                saves={classItem.saves || 0}
                adClicks={classItem.adClicks || 0}
              />
              <TableCell onClick={(e) => e.stopPropagation()}>
                <ClassActions
                  classId={classItem.id}
                  onEdit={(e) => {
                    e.stopPropagation();
                    setSelectedClassId(classItem.id);
                    setIsEditOpen(true);
                  }}
                  onMessage={(e) => {
                    e.stopPropagation();
                    setSelectedClassId(classItem.id);
                    setIsMessageOpen(true);
                  }}
                  onPromote={(e) => {
                    e.stopPropagation();
                    setSelectedClassId(classItem.id);
                    setIsPromoteOpen(true);
                  }}
                  onShare={(e) => {
                    e.stopPropagation();
                    setSelectedClassId(classItem.id);
                    setIsShareOpen(true);
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <MessageDialog 
        open={isMessageOpen}
        onOpenChange={setIsMessageOpen}
        classId={selectedClassId}
      />

      <PromoteDialog 
        open={isPromoteOpen}
        onOpenChange={setIsPromoteOpen}
        classId={selectedClassId}
      />

      <ShareDialog
        open={isShareOpen}
        onOpenChange={setIsShareOpen}
        classId={selectedClassId}
      />

      <ClassDetailsDialog
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        classId={selectedClassId}
      />

      <EditClassDialog 
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        classId={selectedClassId}
        onSuccess={handleEditSuccess}
      />
    </>
  );
};

export default ClassesTable;
