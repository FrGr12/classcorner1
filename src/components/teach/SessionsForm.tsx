import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { Session } from "@/types/session";
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

export const SessionsForm = ({ sessions, setSessions }) => {
  const [newDate, setNewDate] = useState<Date | undefined>(undefined);
  const [newStartTime, setNewStartTime] = useState("");
  const [newEndTime, setNewEndTime] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrencePattern, setRecurrencePattern] = useState("");
  const [recurrenceEndDate, setRecurrenceEndDate] = useState<Date | undefined>(undefined);

  const handleAddSession = () => {
    if (newDate && newStartTime) {
      const newSession: Session = {
        id: Date.now(),
        date: newDate,
        start_time: newStartTime,
        end_time: newEndTime,
        is_recurring: isRecurring,
        recurrence_pattern: isRecurring ? recurrencePattern : undefined,
        recurrence_end_date: isRecurring ? recurrenceEndDate : undefined,
      };
      
      setSessions([...sessions, newSession]);
      
      setNewDate(undefined);
      setNewStartTime("");
      setNewEndTime("");
      setIsRecurring(false);
      setRecurrencePattern("");
      setRecurrenceEndDate(undefined);
    }
  };

  const handleRemoveSession = (id: number) => {
    setSessions(sessions.filter(session => session.id !== id));
  };

  return (
    <div className="space-y-4">
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
      
      {sessions.length > 0 && (
        <div>
          <h3 className="font-medium mb-2">Scheduled Sessions</h3>
          <div className="space-y-2">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-2 bg-muted rounded-md"
              >
                <div>
                  <p className="font-medium">
                    {typeof session.date === 'string' 
                      ? format(new Date(session.date), "PPP") 
                      : format(session.date, "PPP")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {session.start_time} - {session.end_time || "TBD"}
                    {session.is_recurring && ` (${session.recurrence_pattern})`}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveSession(session.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
