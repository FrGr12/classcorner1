
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { UseFormReturn } from "react-hook-form";

interface WaitlistSectionProps {
  form: UseFormReturn<any>;
}

const WaitlistSection = ({ form }: WaitlistSectionProps) => {
  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between">
        <FormLabel htmlFor="waitlistEnabled" className="text-xs sm:text-sm">Enable Waitlist</FormLabel>
        <Switch 
          id="waitlistEnabled"
          checked={form.watch("waitlistEnabled")}
          onCheckedChange={(checked) => form.setValue("waitlistEnabled", checked)}
        />
      </div>

      {form.watch("waitlistEnabled") && (
        <FormField
          control={form.control}
          name="maxWaitlistSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm">Maximum Waitlist Size</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  {...field} 
                  className="h-9 sm:h-10 text-xs sm:text-sm"
                />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};

export default WaitlistSection;
