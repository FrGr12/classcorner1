import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Session } from "@/types/session";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <Card>
      <CardHeader>
        <CardTitle>Add Sessions</CardTitle>
        <CardDescription>
          Schedule regular or recurring sessions for your course
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
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
          onClick={addSession}
          disabled={!startDate}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Session
        </Button>

        <SessionList sessions={sessions} removeSession={removeSession} />
      </CardContent>
    </Card>
  );
};

export default SessionsForm;