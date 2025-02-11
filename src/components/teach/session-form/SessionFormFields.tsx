
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SessionFormFieldsProps {
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  startTime: string;
  setStartTime: (time: string) => void;
  isRecurring: boolean;
  setIsRecurring: (recurring: boolean) => void;
  recurrencePattern: string | undefined;
  setRecurrencePattern: (pattern: string) => void;
  recurrenceEndDate: Date | undefined;
  setRecurrenceEndDate: (date: Date | undefined) => void;
  recurrenceCount: string | undefined;
  setRecurrenceCount: (count: string) => void;
}

const SessionFormFields = ({
  startDate,
  setStartDate,
  startTime,
  setStartTime,
  isRecurring,
  recurrencePattern,
  setRecurrencePattern,
  recurrenceEndDate,
  setRecurrenceEndDate,
  recurrenceCount,
  setRecurrenceCount,
}: SessionFormFieldsProps) => {
  return (
    <>
      <Label className="text-sm font-medium text-primary">Session Date & Time</Label>
      <div className="flex gap-4">
        <div className="flex-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-white border-neutral-200",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex-1">
          <Input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="bg-white border-neutral-200"
          />
        </div>
      </div>

      {isRecurring && (
        <div className="space-y-4 mt-4">
          <div>
            <Label>Recurrence Pattern</Label>
            <Select
              value={recurrencePattern}
              onValueChange={setRecurrencePattern}
            >
              <SelectTrigger className="bg-white border-neutral-200">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="biweekly">Bi-weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>End After (optional)</Label>
            <Input
              type="number"
              placeholder="Number of occurrences"
              value={recurrenceCount}
              onChange={(e) => setRecurrenceCount(e.target.value)}
              className="bg-white border-neutral-200"
            />
          </div>

          <div>
            <Label>End Date (optional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-white border-neutral-200",
                    !recurrenceEndDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {recurrenceEndDate
                    ? format(recurrenceEndDate, "PPP")
                    : "Select end date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={recurrenceEndDate}
                  onSelect={setRecurrenceEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}
    </>
  );
};

export default SessionFormFields;

