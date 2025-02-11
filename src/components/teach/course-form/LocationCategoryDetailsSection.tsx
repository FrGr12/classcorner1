
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
import { UseFormReturn } from "react-hook-form";
import { Session } from "@/types/session";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SessionFormFields from "../session-form/SessionFormFields";

interface LocationCategoryDetailsSectionProps {
  form: UseFormReturn<any>;
}

const LocationCategoryDetailsSection = ({ form }: LocationCategoryDetailsSectionProps) => {
  const [sessions, setSessions] = useState<Session[]>([]);
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
      // Reset form
      setStartDate(undefined);
      setStartTime("12:00");
      setIsRecurring(false);
      setRecurrencePattern(undefined);
      setRecurrenceEndDate(undefined);
      setRecurrenceCount(undefined);
    }
  };

  return (
    <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-start gap-4">
          <div className="flex-1 flex items-center justify-center gap-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormLabel className="text-sm font-medium text-primary min-w-[80px]">Select date</FormLabel>
                  <FormControl>
                    <Input 
                      type="date"
                      placeholder="Select date" 
                      className="bg-white border-neutral-200 w-[180px]"
                      value={field.value || ''}
                      onChange={(e) => {
                        field.onChange(e);
                        setStartDate(e.target.valueAsDate || undefined);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormLabel className="text-sm font-medium text-primary min-w-[80px]">Select time</FormLabel>
                  <FormControl>
                    <Input 
                      type="time"
                      placeholder="Select time" 
                      className="bg-white border-neutral-200 w-[180px]"
                      value={field.value || startTime}
                      onChange={(e) => {
                        field.onChange(e);
                        setStartTime(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col items-end gap-2">
            <Button 
              type="button" 
              onClick={addSession}
              className="bg-accent-purple hover:bg-accent-purple/90 text-white"
              disabled={!startDate}
            >
              Add session
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  type="button" 
                  variant="outline"
                  className={`bg-white border-accent-purple text-accent-purple hover:bg-accent-purple/10 ${isRecurring ? 'bg-accent-purple/10' : ''}`}
                >
                  Make Recurring
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Set Recurring Schedule</SheetTitle>
                  <SheetDescription>
                    Create a recurring schedule for your class sessions
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6">
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
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {sessions.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Scheduled Sessions</h4>
            <div className="space-y-2">
              {sessions.map((session, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm">
                      {session.start.toLocaleDateString()} at {session.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {session.isRecurring && session.recurrencePattern && (
                        <span className="ml-2 text-muted-foreground">
                          (Recurring {session.recurrencePattern})
                        </span>
                      )}
                    </p>
                    {session.isRecurring && (session.recurrenceCount || session.recurrenceEndDate) && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Ends {session.recurrenceCount 
                          ? `after ${session.recurrenceCount} occurrences`
                          : `on ${session.recurrenceEndDate?.toLocaleDateString()}`}
                      </p>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setSessions(sessions.filter((_, i) => i !== index))}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LocationCategoryDetailsSection;
