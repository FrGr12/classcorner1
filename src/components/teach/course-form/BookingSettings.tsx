import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

interface BookingSettingsProps {
  form: UseFormReturn<any>;
}

const BookingSettings = ({ form }: BookingSettingsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="groupBookingsEnabled"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Group Bookings</FormLabel>
                <FormDescription>
                  Allow students to book your course as a group
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {form.watch("groupBookingsEnabled") && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4">
            <FormField
              control={form.control}
              name="basePriceGroup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group Price (per person)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter price" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="minGroupSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Min Size</FormLabel>
                    <FormControl>
                      <Input type="number" min="2" placeholder="Min" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxGroupSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Size</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Max" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        <FormField
          control={form.control}
          name="privateBookingsEnabled"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Private Bookings</FormLabel>
                <FormDescription>
                  Allow students to book private sessions
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {form.watch("privateBookingsEnabled") && (
          <div className="pl-4">
            <FormField
              control={form.control}
              name="basePricePrivate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Private Session Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter price" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        )}

        <FormField
          control={form.control}
          name="paymentTiming"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Timing</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select when to charge students" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="instant">Charge immediately</SelectItem>
                  <SelectItem value="post_course">Charge after the course</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default BookingSettings;