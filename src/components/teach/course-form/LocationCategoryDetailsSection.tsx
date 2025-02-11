
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
      <CardContent className="p-4 space-y-4">
        {sessions.map((session) => (
          <div key={session.id} className="flex items-start gap-4">
            <div className="flex-1 flex items-center justify-center gap-4">
              <FormField
                control={form.control}
                name={`date-${session.id}`}
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormLabel className="text-sm font-medium text-primary min-w-[80px]">Select date</FormLabel>
                    <FormControl>
                      <Input 
                        type="date"
                        placeholder="Select date" 
                        className="bg-white border-neutral-200 w-[180px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`time-${session.id}`}
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormLabel className="text-sm font-medium text-primary min-w-[80px]">Select time</FormLabel>
                    <FormControl>
                      <Input 
                        type="time"
                        placeholder="Select time" 
                        className="bg-white border-neutral-200 w-[180px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col items-end gap-2">
              {sessions.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSession(session.id)}
                  className="h-10 w-10 text-muted-foreground hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}

        <div className="flex justify-end gap-2 mt-4">
          <Button 
            type="button" 
            onClick={addSession}
            className="bg-accent-purple hover:bg-accent-purple/90 text-white"
          >
            Add session
          </Button>

          <Button 
            type="button" 
            variant="outline"
            className="bg-white border-accent-purple text-accent-purple hover:bg-accent-purple/10"
          >
            Make Recurring
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationCategoryDetailsSection;
