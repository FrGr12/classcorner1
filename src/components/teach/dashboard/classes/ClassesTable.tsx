
import { ClassItem } from "@/types/class";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import PromoteDialog from "./promote/PromoteDialog";
import ClassDetailsDialog from "./ClassDetailsDialog";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import ColumnFilter from "./filters/ColumnFilter";
import ClassActions from "./actions/ClassActions";
import PaymentStats from "./PaymentStats";

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

  const handleFilter = (column: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [column]: value
    }));
  };

  const handleEditClick = (classId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/edit-course/${classId}`);
  };

  const filteredClasses = classes.filter(classItem => {
    const stats = paymentStats[classItem.id] || { paid_count: 0, pending_count: 0 };
    const matchesTitle = classItem.title.toLowerCase().includes(filters.title.toLowerCase());
    const matchesDate = !filters.date || getFormattedDate(classItem.date).toLowerCase().includes(filters.date.toLowerCase());
    const matchesCapacity = !filters.capacity || (classItem.maxParticipants?.toString() || '-').includes(filters.capacity);
    const matchesPaid = !filters.paid || stats.paid_count.toString().includes(filters.paid);
    const matchesAttendees = !filters.attendees || '0'.includes(filters.attendees);
    const matchesWaitlist = !filters.waitlist || '0'.includes(filters.waitlist);

    return matchesTitle && matchesDate && matchesCapacity && matchesAttendees && matchesWaitlist && matchesPaid;
  });

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <ColumnFilter 
                column="Title" 
                value={filters.title}
                onFilter={handleFilter}
              />
            </TableHead>
            <TableHead>
              <ColumnFilter 
                column="Date" 
                value={filters.date}
                onFilter={handleFilter}
              />
            </TableHead>
            <TableHead>
              <ColumnFilter 
                column="Capacity" 
                value={filters.capacity}
                onFilter={handleFilter}
              />
            </TableHead>
            <TableHead>
              <ColumnFilter 
                column="Attendees" 
                value={filters.attendees}
                onFilter={handleFilter}
              />
            </TableHead>
            <TableHead>
              <ColumnFilter 
                column="Waitlist" 
                value={filters.waitlist}
                onFilter={handleFilter}
              />
            </TableHead>
            <TableHead>
              <ColumnFilter 
                column="Paid" 
                value={filters.paid}
                onFilter={handleFilter}
              />
            </TableHead>
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
                  <PaymentStats 
                    paidCount={stats.paid_count}
                    pendingCount={stats.pending_count}
                  />
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <ClassActions
                    classId={classItem.id}
                    onEditClick={handleEditClick}
                    onMessageClick={() => onAction('message', classItem.id)}
                    onPromoteClick={handlePromote}
                    onShareClick={() => setSelectedClassId(classItem.id)}
                  />
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
