
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
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <FormLabel htmlFor="waitlistEnabled">Enable Waitlist</FormLabel>
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
              <FormLabel>Maximum Waitlist Size</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};

export default WaitlistSection;
