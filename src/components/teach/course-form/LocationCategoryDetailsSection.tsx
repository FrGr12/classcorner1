
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

interface LocationCategoryDetailsSectionProps {
  form: UseFormReturn<any>;
}

const LocationCategoryDetailsSection = ({ form }: LocationCategoryDetailsSectionProps) => {
  return (
    <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 flex items-center gap-4">
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

          <Button 
            type="button" 
            onClick={() => console.log('Date and time saved:', form.getValues(['date', 'time']))}
            className="bg-accent-purple hover:bg-accent-purple/90 text-white"
          >
            Add session
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationCategoryDetailsSection;
