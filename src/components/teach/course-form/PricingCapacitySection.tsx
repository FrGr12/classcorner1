
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
import { Switch } from "@/components/ui/switch";

interface PricingCapacitySectionProps {
  form: UseFormReturn<any>;
}

const PricingCapacitySection = ({ form }: PricingCapacitySectionProps) => {
  return (
    <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
      <CardContent className="p-3 sm:p-4 space-y-4">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="grid grid-cols-1 sm:grid-cols-[180px_1fr_auto] gap-2 sm:gap-4">
              <FormLabel className="text-xs sm:text-sm font-medium text-primary">Price per Person</FormLabel>
              <div className="flex gap-2 w-full">
                <FormControl>
                  <Input 
                    type="number" 
                    min="0" 
                    step="0.01" 
                    className="flex-1 bg-white border-neutral-200 text-xs sm:text-sm h-9 sm:h-10"
                    {...field} 
                  />
                </FormControl>
                <Button 
                  type="button" 
                  onClick={() => console.log('Price saved:', field.value)}
                  className="bg-accent-purple hover:bg-accent-purple/90 text-white text-xs sm:text-sm h-9 sm:h-10 px-3 flex-shrink-0"
                >
                  Save
                </Button>
              </div>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="minParticipants"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-xs sm:text-sm font-medium text-primary">Minimum Participants</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="1"
                    className="w-full bg-white border-neutral-200 text-xs sm:text-sm h-9 sm:h-10"
                    {...field}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (!isNaN(value)) {
                        field.onChange(value);
                        // Ensure max is not less than min
                        const maxValue = form.getValues('maxParticipants');
                        if (maxValue < value) {
                          form.setValue('maxParticipants', value);
                        }
                      }
                    }}
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
              <FormItem className="space-y-2">
                <FormLabel className="text-xs sm:text-sm font-medium text-primary">Maximum Participants</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="1"
                    className="w-full bg-white border-neutral-200 text-xs sm:text-sm h-9 sm:h-10"
                    {...field}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (!isNaN(value)) {
                        const minValue = form.getValues('minParticipants');
                        if (value >= minValue) {
                          field.onChange(value);
                        } else {
                          // If max is less than min, set them equal
                          field.onChange(minValue);
                        }
                      }
                    }}
                  />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingCapacitySection;
