
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
      <CardContent className="p-4 space-y-4">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[180px_1fr_auto] items-center gap-4">
              <FormLabel className="text-sm font-medium text-primary">Price per Person</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="0" 
                  step="0.01" 
                  className="bg-white border-neutral-200"
                  {...field} 
                />
              </FormControl>
              <Button 
                type="button" 
                onClick={() => console.log('Price saved:', field.value)}
                className="bg-accent-purple hover:bg-accent-purple/90 text-white"
              >
                Save
              </Button>
              <FormMessage className="col-start-2" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="minParticipants"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[180px_1fr_auto] items-center gap-4">
              <FormLabel className="text-sm font-medium text-primary">Minimum Participants</FormLabel>
              <div className="flex items-center gap-4">
                <FormControl>
                  <Input 
                    type="number" 
                    min="0"
                    className="bg-white border-neutral-200"
                    disabled={field.value === 0}
                    {...field} 
                  />
                </FormControl>
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={field.value === 0}
                    onCheckedChange={(checked) => {
                      form.setValue('minParticipants', checked ? 0 : 1);
                    }}
                  />
                  <span className="text-sm text-neutral-600">No minimum</span>
                </div>
              </div>
              <Button 
                type="button" 
                onClick={() => console.log('Min participants saved:', field.value)}
                className="bg-accent-purple hover:bg-accent-purple/90 text-white"
              >
                Save
              </Button>
              <FormMessage className="col-start-2" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxParticipants"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[180px_1fr_auto] items-center gap-4">
              <FormLabel className="text-sm font-medium text-primary">Maximum Participants</FormLabel>
              <div className="flex items-center gap-4">
                <FormControl>
                  <Input 
                    type="number" 
                    min="0"
                    className="bg-white border-neutral-200"
                    disabled={field.value === 0}
                    {...field} 
                  />
                </FormControl>
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={field.value === 0}
                    onCheckedChange={(checked) => {
                      form.setValue('maxParticipants', checked ? 0 : 1);
                    }}
                  />
                  <span className="text-sm text-neutral-600">No maximum</span>
                </div>
              </div>
              <Button 
                type="button" 
                onClick={() => console.log('Max participants saved:', field.value)}
                className="bg-accent-purple hover:bg-accent-purple/90 text-white"
              >
                Save
              </Button>
              <FormMessage className="col-start-2" />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default PricingCapacitySection;
