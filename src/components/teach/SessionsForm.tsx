import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Session {
  start: Date;
  isRecurring: boolean;
  recurrencePattern?: string;
  recurrenceEndDate?: Date;
  recurrenceCount?: number;
}

interface SessionsFormProps {
  sessions: Session[];
  setSessions: (sessions: Session[]) => void;
}

const SessionsForm = ({ sessions, setSessions }: SessionsFormProps) => {
  const [startDate, setStartDate] = useState<Date>();
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrencePattern, setRecurrencePattern] = useState<string>();
  const [recurrenceEndDate, setRecurrenceEndDate] = useState<Date>();
  const [recurrenceCount, setRecurrenceCount] = useState<string>();

  const addSession = () => {
    if (startDate) {
      const newSession: Session = {
        start: startDate,
        isRecurring,
      };

      if (isRecurring) {
        newSession.recurrencePattern = recurrencePattern;
        if (recurrenceEndDate) {
          newSession.recurrenceEndDate = recurrenceEndDate;
        }
        if (recurrenceCount) {
          newSession.recurrenceCount = parseInt(recurrenceCount);
        }
      }

      setSessions([...sessions, newSession]);
      resetForm();
    }
  };

  const resetForm = () => {
    setStartDate(undefined);
    setIsRecurring(false);
    setRecurrencePattern(undefined);
    setRecurrenceEndDate(undefined);
    setRecurrenceCount(undefined);
  };

  const removeSession = (index: number) => {
    setSessions(sessions.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col space-y-4">
          <div>
            <Label>Start Time</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={isRecurring}
              onCheckedChange={setIsRecurring}
              id="recurring"
            />
            <Label htmlFor="recurring">Recurring Session</Label>
          </div>

          {isRecurring && (
            <div className="space-y-4">
              <div>
                <Label>Recurrence Pattern</Label>
                <Select
                  value={recurrencePattern}
                  onValueChange={setRecurrencePattern}
                >
                  <SelectTrigger>
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
                />
              </div>

              <div>
                <Label>End Date (optional)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !recurrenceEndDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {recurrenceEndDate
                        ? format(recurrenceEndDate, "PPP")
                        : "Select end date"}
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

        <Button
          type="button"
          onClick={addSession}
          disabled={!startDate}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Session
        </Button>
      </div>

      {sessions.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Scheduled Sessions</h4>
          <div className="space-y-2">
            {sessions.map((session, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <div className="flex-1">
                  <p className="text-sm">
                    {format(session.start, "PPP")}
                    {session.isRecurring && (
                      <span className="ml-2 text-muted-foreground">
                        (Recurring {session.recurrencePattern})
                      </span>
                    )}
                  </p>
                  {session.isRecurring && (session.recurrenceCount || session.recurrenceEndDate) && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Ends{" "}
                      {session.recurrenceCount
                        ? `after ${session.recurrenceCount} occurrences`
                        : `on ${format(session.recurrenceEndDate!, "PPP")}`}
                    </p>
                  )}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSession(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionsForm;