
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { CourseFormValues } from "../CourseFormContext";

interface LocationCategoryDetailsSectionProps {
  form: UseFormReturn<CourseFormValues>;
}

const LocationCategoryDetailsSection = ({ form }: LocationCategoryDetailsSectionProps) => {
  const locationType = form.watch("locationType");
  
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Location Details</h3>
          <p className="text-sm text-muted-foreground">
            Provide more information about where your class will be held.
          </p>
        </div>
        
        <Separator />
        
        {locationType === "inPerson" && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="State" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Zip Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
        
        {locationType === "online" && (
          <FormField
            control={form.control}
            name="onlineLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Online Meeting Link</FormLabel>
                <FormControl>
                  <Input placeholder="https://zoom.us/j/123456789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        <FormField
          control={form.control}
          name="classDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class Details</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Provide additional details about your class location..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Card>
  );
};

export default LocationCategoryDetailsSection;
