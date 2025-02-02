import { format, isValid } from "date-fns";

interface ClassDetailsProps {
  date: string | Date;
  duration?: string;
  price: number;
  participantsCount: number;
  maxParticipants?: number;
}

const ClassDetails = ({ 
  date, 
  duration, 
  price, 
  participantsCount, 
  maxParticipants 
}: ClassDetailsProps) => {
  const formatDate = (date: string | Date) => {
    if (!date) return "No date set";
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return isValid(dateObj) ? format(dateObj, "PPp") : "Invalid date";
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Date & Time</p>
        <p className="font-medium">{formatDate(date)}</p>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Duration</p>
        <p className="font-medium">{duration || "Not set"}</p>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Price</p>
        <p className="font-medium">${price}</p>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Capacity</p>
        <p className="font-medium">
          {participantsCount}/{maxParticipants}
        </p>
      </div>
    </div>
  );
};

export default ClassDetails;