
import { ClassItem } from "@/types/class";
import { format } from "date-fns";
import { TableCell, TableRow } from "@/components/ui/table";
import ClassActions from "./ClassActions";
import StatsDisplay from "./StatsDisplay";

interface ClassRowDesktopProps {
  classItem: ClassItem;
  onDetails: (classId: number) => void;
  onEdit: (e: React.MouseEvent, classId: number) => void;
  onMessage: (e: React.MouseEvent, classId: number) => void;
  onPromote: (e: React.MouseEvent, classId: number) => void;
  onShare: (e: React.MouseEvent, classId: number) => void;
}

const ClassRowDesktop = ({
  classItem,
  onDetails,
  onEdit,
  onMessage,
  onPromote,
  onShare
}: ClassRowDesktopProps) => {
  const formatClassDate = (date: Date | Date[]): string => {
    if (Array.isArray(date)) {
      return date.length > 0 ? format(date[0], 'MM/dd/yy') : '-';
    }
    return format(date, 'MM/dd/yy');
  };

  return (
    <TableRow
      className="cursor-pointer hover:bg-accent/50 hidden sm:table-row"
      onClick={() => onDetails(classItem.id)}
    >
      <TableCell className="font-medium">{classItem.title}</TableCell>
      <TableCell>{formatClassDate(classItem.date)}</TableCell>
      <TableCell className="text-center">{classItem.maxParticipants || '-'}</TableCell>
      <TableCell className="text-center">0</TableCell>
      <TableCell className="text-center">0</TableCell>
      <TableCell className="text-center">0</TableCell>
      <TableCell className="p-0" colSpan={3}>
        <div className="grid grid-cols-3">
          <div className="text-center px-1 sm:px-4">
            <div className="flex items-center justify-center gap-1">
              <span className="text-xs sm:text-sm">{classItem.views || 0}</span>
            </div>
          </div>
          <div className="text-center px-1 sm:px-4">
            <div className="flex items-center justify-center gap-1">
              <span className="text-xs sm:text-sm">{classItem.saves || 0}</span>
            </div>
          </div>
          <div className="text-center px-1 sm:px-4">
            <div className="flex items-center justify-center gap-1">
              <span className="text-xs sm:text-sm">{classItem.adClicks || 0}</span>
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell onClick={(e) => e.stopPropagation()}>
        <ClassActions
          classId={classItem.id}
          onEdit={(e) => onEdit(e, classItem.id)}
          onMessage={(e) => onMessage(e, classItem.id)}
          onPromote={(e) => onPromote(e, classItem.id)}
          onShare={(e) => onShare(e, classItem.id)}
        />
      </TableCell>
    </TableRow>
  );
};

export default ClassRowDesktop;
