
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

interface LocationCategorySectionProps {
  form: UseFormReturn<any>;
}

const LocationCategorySection = ({ form }: LocationCategorySectionProps) => {
  return (
    <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
      <CardContent className="p-3 sm:p-4 space-y-4">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="grid grid-cols-1 sm:grid-cols-[180px_1fr_auto] gap-2 sm:gap-4">
                <FormLabel className="text-xs sm:text-sm font-medium text-primary">Category</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input 
                      placeholder="e.g., Cooking, Art, Music" 
                      className="bg-white border-neutral-200 text-xs sm:text-sm h-9 sm:h-10"
                      {...field} 
                    />
                  </FormControl>
                  <Button 
                    type="button" 
                    onClick={() => console.log('Category saved:', field.value)}
                    className="bg-accent-purple hover:bg-accent-purple/90 text-white text-xs sm:text-sm h-9 sm:h-10 px-3 flex-shrink-0"
                  >
                    Save
                  </Button>
                </div>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="grid grid-cols-1 sm:grid-cols-[180px_1fr_auto] gap-2 sm:gap-4">
                <FormLabel className="text-xs sm:text-sm font-medium text-primary">Location</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input 
                      placeholder="Enter class location" 
                      className="bg-white border-neutral-200 text-xs sm:text-sm h-9 sm:h-10"
                      {...field} 
                    />
                  </FormControl>
                  <Button 
                    type="button" 
                    onClick={() => console.log('Location saved:', field.value)}
                    className="bg-accent-purple hover:bg-accent-purple/90 text-white text-xs sm:text-sm h-9 sm:h-10 px-3 flex-shrink-0"
                  >
                    Save
                  </Button>
                </div>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationCategorySection;
