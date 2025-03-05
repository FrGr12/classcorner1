
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface PricingCapacitySectionProps {
  form: UseFormReturn<any>;
}

const PricingCapacitySection = ({ form }: PricingCapacitySectionProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs sm:text-sm">Price</FormLabel>
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

      <FormField
        control={form.control}
        name="maxParticipants"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs sm:text-sm">Maximum Participants</FormLabel>
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
    </div>
  );
};

export default PricingCapacitySection;
