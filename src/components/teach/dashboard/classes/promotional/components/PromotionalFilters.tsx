
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ClassOption {
  id: number;
  title: string;
}

interface PromotionalFiltersProps {
  selectedClass: string;
  setSelectedClass: (value: string) => void;
  timeRange: string;
  setTimeRange: (value: string) => void;
  classes: ClassOption[];
}

const PromotionalFilters = ({
  selectedClass,
  setSelectedClass,
  timeRange,
  setTimeRange,
  classes,
}: PromotionalFiltersProps) => {
  return (
    <div className="flex gap-4">
      <Select value={selectedClass} onValueChange={setSelectedClass}>
        <SelectTrigger className="w-[200px] bg-white">
          <SelectValue placeholder="Select class" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectGroup>
            <SelectItem value="all">All Classes</SelectItem>
            {classes.map((cls) => (
              <SelectItem key={cls.id} value={cls.id.toString()}>
                {cls.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select value={timeRange} onValueChange={setTimeRange}>
        <SelectTrigger className="w-[150px] bg-white">
          <SelectValue placeholder="Time range" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectGroup>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PromotionalFilters;
