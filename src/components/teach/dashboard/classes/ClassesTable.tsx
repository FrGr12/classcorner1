
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
      return date.length > 0 ? format(date[0], 'MM/dd/yy') : '-';
    }
    return format(date, 'MM/dd/yy');
  };

  const handleEditSuccess = () => {
    onAction('edit', selectedClassId!);
  };

  return (
    <>
      <Table className="text-xs sm:text-sm">
        <TableHeader>
          <TableRow>
            <TableHead>
              <ColumnFilter
                column="Title"
                value={filters.title}
                onChange={(value) => handleFilter('title', value)}
              />
            </TableHead>
            <TableHead>
              <ColumnFilter
                column="Date"
                value={filters.date}
                onChange={(value) => handleFilter('date', value)}
              />
            </TableHead>
            <TableHead className="hidden sm:table-cell">
              <ColumnFilter
                column="Capacity"
                value={filters.capacity}
                onChange={(value) => handleFilter('capacity', value)}
              />
            </TableHead>
            <TableHead className="hidden sm:table-cell">
              <ColumnFilter
                column="Attendees"
                value={filters.attendees}
                onChange={(value) => handleFilter('attendees', value)}
              />
            </TableHead>
            <TableHead className="hidden sm:table-cell">
              <ColumnFilter
                column="Waitlist"
                value={filters.waitlist}
                onChange={(value) => handleFilter('waitlist', value)}
              />
            </TableHead>
            <TableHead className="hidden sm:table-cell">
              <ColumnFilter
                column="Paid"
                value={filters.paid}
                onChange={(value) => handleFilter('paid', value)}
              />
            </TableHead>
            <TableHead className="text-center hidden sm:table-cell">Views</TableHead>
            <TableHead className="text-center hidden sm:table-cell">Saves</TableHead>
            <TableHead className="text-center hidden sm:table-cell">Clicks</TableHead>
            <TableHead className="hidden sm:table-cell">Actions</TableHead>
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
              <TableCell>
                <div className="flex flex-col sm:block">
                  <div className="flex items-center justify-between gap-2">
                    <span className="whitespace-nowrap">{formatClassDate(classItem.date)}</span>
                    <div className="sm:hidden">
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
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-1 mt-2 sm:hidden">
                    <div className="text-center">
                      <span className="block text-[10px] text-muted-foreground">Cap</span>
                      <span>{classItem.maxParticipants || '-'}</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-[10px] text-muted-foreground">Att</span>
                      <span>0</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-[10px] text-muted-foreground">Wait</span>
                      <span>0</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-[10px] text-muted-foreground">Paid</span>
                      <span>0</span>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 border-t pt-1 sm:hidden">
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-muted-foreground">Views:</span>
                      <span>{classItem.views || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-muted-foreground">Saves:</span>
                      <span>{classItem.saves || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-muted-foreground">Clicks:</span>
                      <span>{classItem.adClicks || 0}</span>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">{classItem.maxParticipants || '-'}</TableCell>
              <TableCell className="hidden sm:table-cell">0</TableCell>
              <TableCell className="hidden sm:table-cell">0</TableCell>
              <TableCell className="hidden sm:table-cell">0</TableCell>
              <TableCell className="hidden sm:table-cell">
                <StatsDisplay
                  views={classItem.views || 0}
                  saves={classItem.saves || 0}
                  adClicks={classItem.adClicks || 0}
                />
              </TableCell>
              <TableCell onClick={(e) => e.stopPropagation()} className="hidden sm:table-cell">
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
