
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Session } from "@/types/session";
import SessionFormFields from "./session-form/SessionFormFields";
import SessionList from "./session-form/SessionList";

interface SessionsFormProps {
  sessions: Session[];
  setSessions: (sessions: Session[]) => void;
}

const SessionsForm = ({ sessions, setSessions }: SessionsFormProps) => {
  const [startDate, setStartDate] = useState<Date>();
  const [startTime, setStartTime] = useState<string>("12:00");
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrencePattern, setRecurrencePattern] = useState<string>();
  const [recurrenceEndDate, setRecurrenceEndDate] = useState<Date>();
  const [recurrenceCount, setRecurrenceCount] = useState<string>();

  const addSession = () => {
    if (startDate) {
      // Combine date and time
      const [hours, minutes] = startTime.split(":").map(Number);
      const combinedDateTime = new Date(startDate);
      combinedDateTime.setHours(hours, minutes);

      const newSession: Session = {
        start: combinedDateTime,
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
    setStartTime("12:00");
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
      <div className="grid grid-cols-[1fr_auto] items-start gap-4">
        <div className="space-y-4">
          <SessionFormFields
            startDate={startDate}
            setStartDate={setStartDate}
            startTime={startTime}
            setStartTime={setStartTime}
            isRecurring={isRecurring}
            setIsRecurring={setIsRecurring}
            recurrencePattern={recurrencePattern}
            setRecurrencePattern={setRecurrencePattern}
            recurrenceEndDate={recurrenceEndDate}
            setRecurrenceEndDate={setRecurrenceEndDate}
            recurrenceCount={recurrenceCount}
            setRecurrenceCount={setRecurrenceCount}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsRecurring(!isRecurring)}
            className={`w-full ${isRecurring ? 'bg-accent-purple/10 border-accent-purple text-accent-purple' : 'bg-white'}`}
          >
            {isRecurring ? 'Recurring On' : 'Make Recurring'}
          </Button>
        </div>

        <Button
          type="button"
          onClick={addSession}
          disabled={!startDate}
          className="bg-accent-purple hover:bg-accent-purple/90 text-white h-10"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add
        </Button>
      </div>

      <SessionList sessions={sessions} removeSession={removeSession} />
    </div>
  );
};

export default SessionsForm;
