import { ClassItem } from "@/types/class";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, MessageSquare, ArrowUp, Share2, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import PromoteDialog from "./promote/PromoteDialog";
import ClassDetailsDialog from "./ClassDetailsDialog";
import { useState, useEffect } from "react";
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

interface PaymentStats {
  [key: number]: {
    paid_count: number;
    pending_count: number;
  };
}

const ClassesTable = ({ classes, onAction }: ClassesTableProps) => {
  const navigate = useNavigate();
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [isPromoteOpen, setIsPromoteOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [paymentStats, setPaymentStats] = useState<PaymentStats>({});
  const [filters, setFilters] = useState({
    title: "",
    date: "",
    capacity: "",
    attendees: "",
    waitlist: "",
    paid: "",
  });

  useEffect(() => {
    const fetchPaymentStats = async () => {
      const { data, error } = await supabase
        .from('course_payment_stats')
        .select('*');

      if (error) {
        console.error('Error fetching payment stats:', error);
        return;
      }

      const statsMap = data.reduce((acc: PaymentStats, stat) => {
        acc[stat.course_id] = {
          paid_count: stat.paid_count || 0,
          pending_count: stat.pending_count || 0,
        };
        return acc;
      }, {});

      setPaymentStats(statsMap);
    };

    fetchPaymentStats();
  }, []);

  const getFormattedDate = (date: Date | Date[]) => {
    if (Array.isArray(date)) {
      return format(date[0], 'PPP');
    }
    return format(date, 'PPP');
  };

  const handlePromote = (classId: number) => {
    setSelectedClassId(classId);
    setIsPromoteOpen(true);
  };

  const handleShare = (classId: number) => {
    setSelectedClassId(classId);
    setIsShareOpen(true);
  };

  const handleFilter = (column: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [column]: value
    }));
  };

  const filteredClasses = classes.filter(classItem => {
    const stats = paymentStats[classItem.id] || { paid_count: 0, pending_count: 0 };
    const matchesTitle = classItem.title.toLowerCase().includes(filters.title.toLowerCase());
    const matchesDate = !filters.date || getFormattedDate(classItem.date).toLowerCase().includes(filters.date.toLowerCase());
    const matchesCapacity = !filters.capacity || (classItem.maxParticipants?.toString() || '-').includes(filters.capacity);
    const matchesPaid = !filters.paid || stats.paid_count.toString().includes(filters.paid);
    // For now, attendees and waitlist are hardcoded to 0
    const matchesAttendees = !filters.attendees || '0'.includes(filters.attendees);
    const matchesWaitlist = !filters.waitlist || '0'.includes(filters.waitlist);

    return matchesTitle && matchesDate && matchesCapacity && matchesAttendees && matchesWaitlist && matchesPaid;
  });

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

  const handleEditClick = (classId: number) => {
    navigate(`/edit-course/${classId}`);
  };

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
          {filteredClasses.map((classItem) => {
            const stats = paymentStats[classItem.id] || { paid_count: 0, pending_count: 0 };
            return (
              <TableRow 
                key={classItem.id}
                className="cursor-pointer hover:bg-accent/50"
                onClick={() => {
                  setSelectedClassId(classItem.id);
                  setIsDetailsOpen(true);
                }}
              >
                <TableCell className="font-medium">{classItem.title}</TableCell>
                <TableCell>{getFormattedDate(classItem.date)}</TableCell>
                <TableCell>{classItem.maxParticipants || '-'}</TableCell>
                <TableCell>0</TableCell>
                <TableCell>0</TableCell>
                <TableCell>
                  <span className="font-medium text-green-600">{stats.paid_count}</span>
                  {stats.pending_count > 0 && (
                    <span className="text-sm text-muted-foreground ml-1">
                      ({stats.pending_count} pending)
                    </span>
                  )}
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEditClick(classItem.id)}
                        className="bg-accent-purple hover:bg-accent-purple/90"
                      >
                        <Edit className="h-4 w-4 text-white" />
                      </Button>
                      <span className="text-xs text-muted-foreground">Edit</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onAction('message', classItem.id)}
                        className="bg-accent-purple hover:bg-accent-purple/90"
                      >
                        <MessageSquare className="h-4 w-4 text-white" />
                      </Button>
                      <span className="text-xs text-muted-foreground">Message</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handlePromote(classItem.id)}
                        className="bg-accent-purple hover:bg-accent-purple/90"
                      >
                        <ArrowUp className="h-4 w-4 text-white" />
                      </Button>
                      <span className="text-xs text-muted-foreground">Promote</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleShare(classItem.id)}
                        className="bg-accent-purple hover:bg-accent-purple/90"
                      >
                        <Share2 className="h-4 w-4 text-white" />
                      </Button>
                      <span className="text-xs text-muted-foreground">Share</span>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <PromoteDialog 
        open={isPromoteOpen} 
        onOpenChange={setIsPromoteOpen}
        classId={selectedClassId}
      />

      <ClassDetailsDialog
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        classId={selectedClassId}
      />
    </>
  );
};

export default ClassesTable;
