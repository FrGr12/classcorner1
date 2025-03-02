
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ColumnFilter from "./ColumnFilter";

interface TableHeaderProps {
  filters: {
    title: string;
    date: string;
    capacity: string;
    attendees: string;
    waitlist: string;
    paid: string;
  };
  onFilterChange: (column: string, value: string) => void;
}

const ClassesTableHeader = ({ filters, onFilterChange }: TableHeaderProps) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>
          <ColumnFilter
            column="Title"
            value={filters.title}
            onChange={(value) => onFilterChange('title', value)}
          />
        </TableHead>
        <TableHead>
          <ColumnFilter
            column="Date"
            value={filters.date}
            onChange={(value) => onFilterChange('date', value)}
          />
        </TableHead>
        <TableHead className="hidden sm:table-cell">
          <ColumnFilter
            column="Capacity"
            value={filters.capacity}
            onChange={(value) => onFilterChange('capacity', value)}
          />
        </TableHead>
        <TableHead className="hidden sm:table-cell">
          <ColumnFilter
            column="Attendees"
            value={filters.attendees}
            onChange={(value) => onFilterChange('attendees', value)}
          />
        </TableHead>
        <TableHead className="hidden sm:table-cell">
          <ColumnFilter
            column="Waitlist"
            value={filters.waitlist}
            onChange={(value) => onFilterChange('waitlist', value)}
          />
        </TableHead>
        <TableHead className="hidden sm:table-cell">
          <ColumnFilter
            column="Paid"
            value={filters.paid}
            onChange={(value) => onFilterChange('paid', value)}
          />
        </TableHead>
        <TableHead className="hidden sm:table-cell text-center">Views</TableHead>
        <TableHead className="hidden sm:table-cell text-center">Saves</TableHead>
        <TableHead className="hidden sm:table-cell text-center">Clicks</TableHead>
        <TableHead className="hidden sm:table-cell">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default ClassesTableHeader;
