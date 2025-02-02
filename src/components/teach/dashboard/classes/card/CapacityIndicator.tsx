import { Progress } from "@/components/ui/progress";

interface CapacityIndicatorProps {
  participantsCount: number;
  maxParticipants?: number;
}

const CapacityIndicator = ({ participantsCount, maxParticipants }: CapacityIndicatorProps) => {
  const occupancyRate = maxParticipants 
    ? Math.round((participantsCount / maxParticipants) * 100)
    : 0;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Class Capacity</span>
        <span>{occupancyRate}%</span>
      </div>
      <Progress value={occupancyRate} />
    </div>
  );
};

export default CapacityIndicator;