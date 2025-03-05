
import { useState } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { X } from "lucide-react";

interface LocationCategoryDetailsSectionProps {
  form: UseFormReturn<any>;
}

interface SessionField {
  id: string;
  date: string;
  time: string;
}

const LocationCategoryDetailsSection = ({ form }: LocationCategoryDetailsSectionProps) => {
  const [sessions, setSessions] = useState<SessionField[]>([
    { id: '1', date: '', time: '' }
  ]);
  const [recurrencePattern, setRecurrencePattern] = useState<string>();

  const addSession = () => {
    setSessions([...sessions, { 
      id: Math.random().toString(36).substr(2, 9),
      date: '',
      time: ''
    }]);
  };

  const removeSession = (id: string) => {
    if (sessions.length > 1) {
      setSessions(sessions.filter(session => session.id !== id));
    }
  };

  return (
    <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
      <CardContent className="p-3 sm:p-4 space-y-4">
        {sessions.map((session) => (
          <div key={session.id} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name={`date-${session.id}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm font-medium text-primary">Select date</FormLabel>
                    <FormControl>
                      <Input 
                        type="date"
                        placeholder="Select date" 
                        className="bg-white border-neutral-200 w-full text-xs sm:text-sm h-9 sm:h-10"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`time-${session.id}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm font-medium text-primary">Select time</FormLabel>
                    <FormControl>
                      <Input 
                        type="time"
                        placeholder="Select time" 
                        className="bg-white border-neutral-200 w-full text-xs sm:text-sm h-9 sm:h-10"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end sm:items-start">
              {sessions.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSession(session.id)}
                  className="h-9 w-9 text-muted-foreground hover:text-destructive self-start sm:self-auto"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}

        <div className="flex flex-col sm:flex-row sm:justify-end gap-2 mt-4">
          <Button 
            type="button" 
            onClick={addSession}
            className="bg-accent-purple hover:bg-accent-purple/90 text-white text-xs sm:text-sm h-9 sm:h-10"
          >
            Add session
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button 
                type="button" 
                variant="outline"
                className="bg-white border-accent-purple text-accent-purple hover:bg-accent-purple/10 text-xs sm:text-sm h-9 sm:h-10"
              >
                Make Recurring
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] p-4 sm:p-6 bg-white">
              <DialogHeader>
                <DialogTitle className="text-base sm:text-lg">Set Recurring Schedule</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <FormLabel className="text-xs sm:text-sm">Recurrence Pattern</FormLabel>
                  <Select
                    value={recurrencePattern}
                    onValueChange={setRecurrencePattern}
                  >
                    <SelectTrigger className="w-full h-9 sm:h-10 text-xs sm:text-sm">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <FormLabel className="text-xs sm:text-sm">End After (Optional)</FormLabel>
                  <Input
                    type="number"
                    placeholder="Number of occurrences"
                    className="bg-white border-neutral-200 h-9 sm:h-10 text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <FormLabel className="text-xs sm:text-sm">End Date (Optional)</FormLabel>
                  <Input
                    type="date"
                    className="bg-white border-neutral-200 h-9 sm:h-10 text-xs sm:text-sm"
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationCategoryDetailsSection;
