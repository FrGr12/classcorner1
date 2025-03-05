
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { SessionsForm } from "../SessionsForm";
import { Session } from "@/types/session";

interface SessionManagementProps {
  form: UseFormReturn<any>;
}

const SessionManagement = ({ form }: SessionManagementProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (minutes)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="e.g., 120" 
                    {...field} 
                    onChange={(e) => field.onChange(parseInt(e.target.value) || "")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="max_participants"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum Participants</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="e.g., 10" 
                    {...field} 
                    onChange={(e) => field.onChange(parseInt(e.target.value) || "")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-base font-medium">Session Schedule</h3>
        <SessionsForm
          sessions={form.watch("sessions") || []}
          setSessions={(sessions: Session[]) => form.setValue("sessions", sessions)}
        />
      </div>
    </div>
  );
};

export default SessionManagement;
