
import { useState } from "react";
import { Session } from "@/types/session";
import SessionFormFields from "./SessionFormFields";
import SessionList from "./SessionList";

interface SessionFormProps {
  sessions: Session[];
  setSessions: (sessions: Session[]) => void;
}

const SessionForm = ({ sessions, setSessions }: SessionFormProps) => {
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
      
      // Reset form
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
      <SessionFormFields
        newDate={newDate}
        setNewDate={setNewDate}
        newStartTime={newStartTime}
        setNewStartTime={setNewStartTime}
        newEndTime={newEndTime}
        setNewEndTime={setNewEndTime}
        isRecurring={isRecurring}
        setIsRecurring={setIsRecurring}
        recurrencePattern={recurrencePattern}
        setRecurrencePattern={setRecurrencePattern}
        recurrenceEndDate={recurrenceEndDate}
        setRecurrenceEndDate={setRecurrenceEndDate}
        handleAddSession={handleAddSession}
      />

      {sessions.length > 0 && (
        <SessionList
          sessions={sessions}
          onRemoveSession={handleRemoveSession}
        />
      )}
    </div>
  );
};

export default SessionForm;
