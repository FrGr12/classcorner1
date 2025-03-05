
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { CourseFormValues } from '../CourseFormContext';

interface PricingAndLogisticsProps {
  form: UseFormReturn<CourseFormValues>;
}

const PricingAndLogistics = ({ form }: PricingAndLogisticsProps) => {
  return (
    <Card className="p-6 mt-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Pricing & Logistics</h3>
          <p className="text-sm text-muted-foreground">Set pricing and capacity for your class</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price per Student ($)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min={0} 
                    placeholder="0.00"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (minutes)</FormLabel>
                <FormControl>
                  <Input 
                    type="text" 
                    placeholder="60"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="min_participants"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum Participants</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min={1} 
                    placeholder="1"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))} 
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
                <FormLabel>Maximum Capacity</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min={1} 
                    placeholder="10"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="waitlist_enabled"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-2">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className="h-4 w-4 mt-1"
                  />
                </FormControl>
                <div>
                  <FormLabel>Enable Waitlist</FormLabel>
                  <p className="text-sm text-muted-foreground">Allow students to join a waitlist when class is full</p>
                </div>
              </FormItem>
            )}
          />

          {form.watch('waitlist_enabled') && (
            <FormField
              control={form.control}
              name="max_waitlist_size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Waitlist Size</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min={1} 
                      placeholder="5"
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
      </div>
    </Card>
  );
};

export default PricingAndLogistics;
