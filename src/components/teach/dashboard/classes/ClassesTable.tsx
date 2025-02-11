
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

interface ViewStats {
  [key: number]: {
    views: number;
    clicks: number;
  };
}

const ClassesTable = ({ classes, onAction }: ClassesTableProps) => {
  const navigate = useNavigate();
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [isPromoteOpen, setIsPromoteOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [paymentStats, setPaymentStats] = useState<PaymentStats>({});
  const [viewStats, setViewStats] = useState<ViewStats>({});
  const [filters, setFilters] = useState({
    title: "",
    date: "",
    capacity: "",
    attendees: "",
    waitlist: "",
    paid: "",
    views: "",
    clicks: "",
  });

  useEffect(() => {
    const fetchStats = async () => {
      // Fetch payment stats
      const { data: paymentData, error: paymentError } = await supabase
        .from('course_payment_stats')
        .select('*');

      if (paymentError) {
        console.error('Error fetching payment stats:', paymentError);
        return;
      }

      // Fetch activity stats for views - Fixed with GROUP BY
      const { data: viewData, error: viewError } = await supabase
        .from('course_activity_log')
        .select(`
          course_id,
          count
        `)
        .eq('activity_type', 'view')
        .select('course_id, count(*)')
        .group('course_id');

      if (viewError) {
        console.error('Error fetching view stats:', viewError);
        return;
      }

      // Fetch activity stats for clicks - Fixed with GROUP BY
      const { data: clickData, error: clickError } = await supabase
        .from('course_activity_log')
        .select(`
          course_id,
          count
        `)
        .eq('activity_type', 'click')
        .select('course_id, count(*)')
        .group('course_id');

      if (clickError) {
        console.error('Error fetching click stats:', clickError);
        return;
      }

      // Process payment stats
      const statsMap = paymentData.reduce((acc: PaymentStats, stat) => {
        acc[stat.course_id] = {
          paid_count: stat.paid_count || 0,
          pending_count: stat.pending_count || 0,
        };
        return acc;
      }, {});
      setPaymentStats(statsMap);

      // Process view and click stats
      const viewStatsMap: ViewStats = {};
      
      // Process views
      viewData?.forEach((stat) => {
        if (!viewStatsMap[stat.course_id]) {
          viewStatsMap[stat.course_id] = { views: 0, clicks: 0 };
        }
        viewStatsMap[stat.course_id].views = parseInt(stat.count);
      });

      // Process clicks
      clickData?.forEach((stat) => {
        if (!viewStatsMap[stat.course_id]) {
          viewStatsMap[stat.course_id] = { views: 0, clicks: 0 };
        }
        viewStatsMap[stat.course_id].clicks = parseInt(stat.count);
      });

      setViewStats(viewStatsMap);
    };

    fetchStats();
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
    const views = viewStats[classItem.id]?.views || 0;
    const clicks = viewStats[classItem.id]?.clicks || 0;
    const matchesTitle = classItem.title.toLowerCase().includes(filters.title.toLowerCase());
    const matchesDate = !filters.date || getFormattedDate(classItem.date).toLowerCase().includes(filters.date.toLowerCase());
    const matchesCapacity = !filters.capacity || (classItem.maxParticipants?.toString() || '-').includes(filters.capacity);
    const matchesPaid = !filters.paid || stats.paid_count.toString().includes(filters.paid);
    const matchesViews = !filters.views || views.toString().includes(filters.views);
    const matchesClicks = !filters.clicks || clicks.toString().includes(filters.clicks);
    const matchesAttendees = !filters.attendees || '0'.includes(filters.attendees);
    const matchesWaitlist = !filters.waitlist || '0'.includes(filters.waitlist);

    return matchesTitle && matchesDate && matchesCapacity && 
           matchesAttendees && matchesWaitlist && matchesPaid && 
           matchesViews && matchesClicks;
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
                column="Views" 
                value={filters.views}
                onFilter={handleFilter}
              />
            </TableHead>
            <TableHead>
              <ColumnFilter 
                column="Clicks" 
                value={filters.clicks}
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
            const views = viewStats[classItem.id]?.views || 0;
            const clicks = viewStats[classItem.id]?.clicks || 0;
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
                <TableCell>{views}</TableCell>
                <TableCell>{clicks}</TableCell>
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
