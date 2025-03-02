
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SessionFormFieldsProps {
  newDate: Date | undefined;
  setNewDate: (date: Date | undefined) => void;
  newStartTime: string;
  setNewStartTime: (time: string) => void;
  newEndTime: string;
  setNewEndTime: (time: string) => void;
  isRecurring: boolean;
  setIsRecurring: (recurring: boolean) => void;
  recurrencePattern: string;
  setRecurrencePattern: (pattern: string) => void;
  recurrenceEndDate: Date | undefined;
  setRecurrenceEndDate: (date: Date | undefined) => void;
  handleAddSession: () => void;
}

const SessionFormFields = ({
  newDate,
  setNewDate,
  newStartTime,
  setNewStartTime,
  newEndTime,
  setNewEndTime,
  isRecurring,
  setIsRecurring,
  recurrencePattern,
  setRecurrencePattern,
  recurrenceEndDate,
  setRecurrenceEndDate,
  handleAddSession,
}: SessionFormFieldsProps) => {
  return (
    <div className="space-y-2">
      <div className="flex gap-4 items-start">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !newDate && "text-muted-foreground"
                )}
              >
                {newDate ? format(newDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={newDate}
                onSelect={setNewDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Start Time</label>
          <Input
            type="time"
            value={newStartTime}
            onChange={(e) => setNewStartTime(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">End Time</label>
          <Input
            type="time"
            value={newEndTime}
            onChange={(e) => setNewEndTime(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
      
      <RecurrenceOptions
        isRecurring={isRecurring}
        setIsRecurring={setIsRecurring}
        recurrencePattern={recurrencePattern}
        setRecurrencePattern={setRecurrencePattern}
        recurrenceEndDate={recurrenceEndDate}
        setRecurrenceEndDate={setRecurrenceEndDate}
      />
      
      <Button
        type="button"
        onClick={handleAddSession}
        disabled={!newDate || !newStartTime}
        className="mt-4"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Session
      </Button>
    </div>
  );
};

interface RecurrenceOptionsProps {
  isRecurring: boolean;
  setIsRecurring: (recurring: boolean) => void;
  recurrencePattern: string;
  setRecurrencePattern: (pattern: string) => void;
  recurrenceEndDate: Date | undefined;
  setRecurrenceEndDate: (date: Date | undefined) => void;
}

const RecurrenceOptions = ({
  isRecurring,
  setIsRecurring,
  recurrencePattern,
  setRecurrencePattern,
  recurrenceEndDate,
  setRecurrenceEndDate,
}: RecurrenceOptionsProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="recurring"
          checked={isRecurring}
          onCheckedChange={(checked) => setIsRecurring(checked === true)}
        />
        <label
          htmlFor="recurring"
          className="text-sm font-medium leading-none cursor-pointer"
        >
          Recurring session
        </label>
      </div>
      
      {isRecurring && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-sm font-medium mb-1">Recurrence Pattern</label>
            <Select
              value={recurrencePattern}
              onValueChange={setRecurrencePattern}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select pattern" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="biweekly">Bi-weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !recurrenceEndDate && "text-muted-foreground"
                  )}
                >
                  {recurrenceEndDate ? format(recurrenceEndDate, "PPP") : "Select end date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
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
    </div>
  );
};

export default SessionFormFields;
