
import { ClassItem } from "@/types/class";
import { format } from "date-fns";
import { TableCell, TableRow } from "@/components/ui/table";
import ClassActions from "./ClassActions";

interface ClassRowMobileProps {
  classItem: ClassItem;
  onDetails: (classId: number) => void;
  onEdit: (e: React.MouseEvent, classId: number) => void;
  onMessage: (e: React.MouseEvent, classId: number) => void;
  onPromote: (e: React.MouseEvent, classId: number) => void;
  onShare: (e: React.MouseEvent, classId: number) => void;
}

const ClassRowMobile = ({ 
  classItem, 
  onDetails,
  onEdit,
  onMessage,
  onPromote,
  onShare
}: ClassRowMobileProps) => {
  const formatClassDate = (date: Date | Date[]): string => {
    if (Array.isArray(date)) {
      return date.length > 0 ? format(date[0], 'MM/dd/yy') : '-';
    }
    return format(date, 'MM/dd/yy');
  };

  return (
    <TableRow 
      className="cursor-pointer hover:bg-accent/50"
      onClick={() => onDetails(classItem.id)}
    >
      <TableCell className="font-medium">{classItem.title}</TableCell>
      <TableCell>
        <div className="flex flex-col sm:block">
          <div className="flex items-center justify-between gap-2">
            <span className="whitespace-nowrap">{formatClassDate(classItem.date)}</span>
            <div className="sm:hidden">
              <ClassActions
                classId={classItem.id}
                onEdit={(e) => onEdit(e, classItem.id)}
                onMessage={(e) => onMessage(e, classItem.id)}
                onPromote={(e) => onPromote(e, classItem.id)}
                onShare={(e) => onShare(e, classItem.id)}
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
    </TableRow>
  );
};

export default ClassRowMobile;
