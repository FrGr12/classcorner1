
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

interface LocationCategorySectionProps {
  form: UseFormReturn<any>;
}

const LocationCategorySection = ({ form }: LocationCategorySectionProps) => {
  return (
    <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
      <CardContent className="p-4 space-y-4">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-primary">Category</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., Cooking, Art, Music" 
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
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-primary">Location</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter class location" 
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

export default LocationCategorySection;
