
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { CourseFormValues } from '../CourseFormContext';
import { Switch } from '@/components/ui/switch';

interface PricingCapacitySectionProps {
  form: UseFormReturn<CourseFormValues>;
}

const PricingCapacitySection = ({ form }: PricingCapacitySectionProps) => {
  return (
    <Card className="p-6 mt-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Pricing & Capacity</h3>
          <p className="text-sm text-muted-foreground">Set the price and capacity for your class</p>
        </div>

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price per Student (USD)</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Capacity</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="min_participants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum Participants</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Optional"
                  {...field}
                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="max_participants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Participants</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Optional"
                  {...field}
                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-2">
          <Switch
            id="waitlist"
            checked={form.getValues("waitlist_enabled") || false}
            onCheckedChange={(checked) => form.setValue("waitlist_enabled", checked)}
          />
          <Label htmlFor="waitlist">Enable Waitlist</Label>
        </div>

        {form.getValues("waitlist_enabled") && (
          <FormField
            control={form.control}
            name="max_waitlist_size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum Waitlist Size</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>
    </Card>
  );
};

export default PricingCapacitySection;
