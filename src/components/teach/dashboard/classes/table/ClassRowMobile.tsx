
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
      return date.length > 0 ? format(date[0], 'MMM dd, yyyy') : '-';
    }
    return format(date, 'MMM dd, yyyy');
  };

  return (
    <TableRow 
      className="cursor-pointer hover:bg-accent/50 sm:hidden"
      onClick={() => onDetails(classItem.id)}
    >
      <TableCell className="font-medium">
        <div className="flex flex-col sm:block">
          <span className="text-sm font-medium">{classItem.title}</span>
          <div className="flex items-center justify-between gap-2 mt-1">
            <span className="whitespace-nowrap text-xs text-muted-foreground">{formatClassDate(classItem.date)}</span>
            <div>
              <ClassActions
                classId={classItem.id}
                onEdit={(e) => onEdit(e, classItem.id)}
                onMessage={(e) => onMessage(e, classItem.id)}
                onPromote={(e) => onPromote(e, classItem.id)}
                onShare={(e) => onShare(e, classItem.id)}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-1 mt-2">
            <div className="text-center">
              <span className="block text-[10px] text-muted-foreground">Cap</span>
              <span className="text-xs">{classItem.maxParticipants || '-'}</span>
            </div>
            <div className="text-center">
              <span className="block text-[10px] text-muted-foreground">Att</span>
              <span className="text-xs">0</span>
            </div>
            <div className="text-center">
              <span className="block text-[10px] text-muted-foreground">Wait</span>
              <span className="text-xs">0</span>
            </div>
            <div className="text-center">
              <span className="block text-[10px] text-muted-foreground">Paid</span>
              <span className="text-xs">0</span>
            </div>
          </div>
          <div className="flex justify-between mt-2 border-t pt-1">
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-muted-foreground">Views:</span>
              <span className="text-xs">{classItem.views || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-muted-foreground">Saves:</span>
              <span className="text-xs">{classItem.saves || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-muted-foreground">Clicks:</span>
              <span className="text-xs">{classItem.adClicks || 0}</span>
            </div>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ClassRowMobile;
