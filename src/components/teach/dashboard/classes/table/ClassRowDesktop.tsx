
import { ClassItem } from "@/types/class";
import { format } from "date-fns";
import { TableCell, TableRow } from "@/components/ui/table";
import ClassActions from "./ClassActions";
import { Badge } from "@/components/ui/badge";

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
      return date.length > 0 ? format(date[0], 'MMM dd, yyyy') : '-';
    }
    return format(date, 'MMM dd, yyyy');
  };

  const getStatusBadge = (status: string) => {
    if (!status) return null;
    
    const statusMap: Record<string, { color: string, label: string }> = {
      active: { color: "bg-green-100 text-green-800", label: "Active" },
      draft: { color: "bg-gray-100 text-gray-800", label: "Draft" },
      completed: { color: "bg-blue-100 text-blue-800", label: "Completed" },
    };
    
    const statusInfo = statusMap[status.toLowerCase()] || { color: "bg-gray-100 text-gray-800", label: status };
    
    return (
      <Badge variant="outline" className={`${statusInfo.color} border-none`}>
        {statusInfo.label}
      </Badge>
    );
  };

  return (
    <TableRow
      className="cursor-pointer hover:bg-accent/50 hidden sm:table-row"
      onClick={() => onDetails(classItem.id)}
    >
      <TableCell className="font-medium">{classItem.title}</TableCell>
      <TableCell>{formatClassDate(classItem.date)}</TableCell>
      <TableCell>{getStatusBadge(classItem.status || 'draft')}</TableCell>
      <TableCell className="text-center">{classItem.maxParticipants || '-'}</TableCell>
      <TableCell className="text-center">0</TableCell>
      <TableCell className="text-center">0</TableCell>
      <TableCell className="text-center">0</TableCell>
      <TableCell className="text-center">{classItem.views || 0}</TableCell>
      <TableCell className="text-center">{classItem.saves || 0}</TableCell>
      <TableCell className="text-center">{classItem.adClicks || 0}</TableCell>
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
