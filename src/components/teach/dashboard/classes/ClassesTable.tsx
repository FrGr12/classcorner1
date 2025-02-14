import { ClassItem } from "@/types/class";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, MessageSquare, ArrowUp, Share2, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import PromoteDialog from "./promote/PromoteDialog";
import ClassDetailsDialog from "./ClassDetailsDialog";
import MessageDialog from "./dialogs/MessageDialog";
import ShareDialog from "./dialogs/ShareDialog";
import EditClassDialog from "./dialogs/EditClassDialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

interface ClassesTableProps {
  classes: ClassItem[];
  onAction: (action: string, classId: number) => void;
}

const ClassesTable = ({ classes, onAction }: ClassesTableProps) => {
  const navigate = useNavigate();
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

  const handleEditClick = (classId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedClassId(classId);
    setIsEditOpen(true);
  };

  const handlePromote = (classId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedClassId(classId);
    setIsPromoteOpen(true);
  };

  const handleMessage = (classId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedClassId(classId);
    setIsMessageOpen(true);
  };

  const handleShare = (classId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedClassId(classId);
    setIsShareOpen(true);
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

  const ColumnFilter = ({ column }: { column: string }) => (
    <div className="flex items-center gap-2">
      <span>{column}</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[200px]">
          <div className="p-2">
            <Input
              placeholder={`Filter ${column.toLowerCase()}...`}
              value={filters[column.toLowerCase() as keyof typeof filters]}
              onChange={(e) => handleFilter(column.toLowerCase(), e.target.value)}
              className="h-8"
            />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead><ColumnFilter column="Title" /></TableHead>
            <TableHead><ColumnFilter column="Date" /></TableHead>
            <TableHead><ColumnFilter column="Capacity" /></TableHead>
            <TableHead><ColumnFilter column="Attendees" /></TableHead>
            <TableHead><ColumnFilter column="Waitlist" /></TableHead>
            <TableHead><ColumnFilter column="Paid" /></TableHead>
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
              <TableCell onClick={(e) => e.stopPropagation()}>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => handleEditClick(classItem.id, e)}
                    className="bg-accent-purple hover:bg-accent-purple/90"
                  >
                    <Edit className="h-4 w-4 text-white" />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => handleMessage(classItem.id, e)}
                    className="bg-accent-purple hover:bg-accent-purple/90"
                  >
                    <MessageSquare className="h-4 w-4 text-white" />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => handlePromote(classItem.id, e)}
                    className="bg-accent-purple hover:bg-accent-purple/90"
                  >
                    <ArrowUp className="h-4 w-4 text-white" />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => handleShare(classItem.id, e)}
                    className="bg-accent-purple hover:bg-accent-purple/90"
                  >
                    <Share2 className="h-4 w-4 text-white" />
                  </Button>
                </div>
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
