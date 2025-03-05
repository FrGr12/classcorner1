
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Session } from "@/types/session";

interface SessionsFormProps {
  sessions: Session[];
  setSessions: (sessions: Session[]) => void;
}

export function SessionsForm({ sessions, setSessions }: SessionsFormProps) {
  const [newDate, setNewDate] = useState<Date | undefined>();
  const [newStartTime, setNewStartTime] = useState("");
  const [newEndTime, setNewEndTime] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringWeeks, setRecurringWeeks] = useState(1);

  const handleAddSession = () => {
    if (newDate && newStartTime) {
      const newSession: Session = {
        id: Date.now(),
        date: newDate,
        start_time: newStartTime,
        end_time: newEndTime,
        is_recurring: isRecurring,
        recurring_weeks: isRecurring ? recurringWeeks : 0,
        max_participants: 10,
        status: "scheduled"
      };
      
      setSessions([...sessions, newSession]);
      
      setNewDate(undefined);
      setNewStartTime("");
      setNewEndTime("");
    }
  };

  const handleRemoveSession = (id: number) => {
    setSessions(sessions.filter(session => session.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {newDate ? format(newDate, "PPP") : <span>Pick a date</span>}
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
          <Input
            type="time"
            placeholder="Start Time"
            value={newStartTime}
            onChange={(e) => setNewStartTime(e.target.value)}
          />
        </div>
        <div>
          <Input
            type="time"
            placeholder="End Time"
            value={newEndTime}
            onChange={(e) => setNewEndTime(e.target.value)}
          />
        </div>
      </div>

      <Button 
        size="sm" 
        variant="outline" 
        onClick={handleAddSession}
        disabled={!newDate || !newStartTime}
        className="flex items-center"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Session
      </Button>

      {sessions.length > 0 && (
        <div className="mt-6 space-y-2">
          <h3 className="text-sm font-medium">Scheduled Sessions</h3>
          <div className="space-y-2">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-3 bg-muted rounded-md"
              >
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">
                    {format(new Date(session.date), "PPP")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {session.start_time} - {session.end_time}
                  </p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
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
}

// Provide both named export and default export for backward compatibility
export default SessionsForm;
