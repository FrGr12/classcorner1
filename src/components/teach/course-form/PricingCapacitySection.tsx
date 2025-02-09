
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface PricingCapacitySectionProps {
  form: UseFormReturn<any>;
}

const PricingCapacitySection = ({ form }: PricingCapacitySectionProps) => {
  return (
    <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="w-5 h-5 text-accent-purple" />
          <h3 className="text-lg font-medium text-primary">Pricing & Capacity</h3>
        </div>

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-primary">Price per Person</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="0" 
                  step="0.01" 
                  className="bg-white border-neutral-200"
                  {...field} 
                />
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
              <FormLabel className="font-medium text-primary">Maximum Participants</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="1" 
                  className="bg-white border-neutral-200"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default PricingCapacitySection;
