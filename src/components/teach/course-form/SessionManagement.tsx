
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { SessionsForm } from "../SessionsForm";
import { Session } from "@/types/session";

interface SessionManagementProps {
  form: UseFormReturn<any>;
  sessions: Session[];
  setSessions: (sessions: Session[]) => void;
}

const SessionManagement = ({ form, sessions, setSessions }: SessionManagementProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Standard Price (per person)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter price" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxParticipants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Participants</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter max participants" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <SessionsForm sessions={sessions} setSessions={setSessions} />
    </div>
  );
};

export default SessionManagement;
