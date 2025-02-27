
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface SchedulingSectionProps {
  form: UseFormReturn<any>;
}

const SchedulingSection = ({ form }: SchedulingSectionProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="startDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs sm:text-sm">Start Date</FormLabel>
            <FormControl>
              <Input 
                type="date" 
                {...field} 
                className="h-9 sm:h-10 text-xs sm:text-sm"
              />
            </FormControl>
            <FormMessage className="text-xs sm:text-sm" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="startTime"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs sm:text-sm">Start Time</FormLabel>
            <FormControl>
              <Input 
                type="time" 
                {...field} 
                className="h-9 sm:h-10 text-xs sm:text-sm"
              />
            </FormControl>
            <FormMessage className="text-xs sm:text-sm" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default SchedulingSection;
