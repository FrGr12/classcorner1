
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";

interface LocationCategoryDetailsSectionProps {
  form: UseFormReturn<any>;
}

const LocationCategoryDetailsSection = ({ form }: LocationCategoryDetailsSectionProps) => {
  return (
    <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-sm font-medium text-primary">Date</FormLabel>
                <FormControl>
                  <Input 
                    type="date"
                    placeholder="Select date" 
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
            name="time"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-sm font-medium text-primary">Time</FormLabel>
                <FormControl>
                  <Input 
                    type="time"
                    placeholder="Select time" 
                    className="bg-white border-neutral-200"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationCategoryDetailsSection;

