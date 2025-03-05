
import SessionForm from "./sessions/SessionForm";
import { Session } from "@/types/session";

interface SessionsFormProps {
  sessions: Session[];
  setSessions: (sessions: Session[]) => void;
}

export const SessionsForm = ({ 
  sessions, 
  setSessions 
}: SessionsFormProps) => {
  return <SessionForm sessions={sessions} setSessions={setSessions} />;
};
