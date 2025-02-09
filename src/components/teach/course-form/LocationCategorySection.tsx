
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Map } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface LocationCategorySectionProps {
  form: UseFormReturn<any>;
}

const LocationCategorySection = ({ form }: LocationCategorySectionProps) => {
  return (
    <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Map className="w-5 h-5 text-accent-purple" />
          <h3 className="text-lg font-medium text-primary">Location & Category</h3>
        </div>

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
