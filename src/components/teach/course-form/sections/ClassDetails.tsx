
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card } from '@/components/ui/card';
import { CourseFormValues } from '../CourseFormContext';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface ClassDetailsProps {
  form: UseFormReturn<CourseFormValues>;
}

const ClassDetails = ({ form }: ClassDetailsProps) => {
  return (
    <Card className="p-6 mt-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Class Details</h3>
          <p className="text-sm text-muted-foreground">Share what students need to know</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Studio, Park, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Arts, Cooking, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Street address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
        </div>

        <FormField
          control={form.control}
          name="is_online"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>This is an online class</FormLabel>
                <p className="text-sm text-muted-foreground">
                  Students will attend this class virtually
                </p>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="learning_outcomes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Learning Outcomes</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="What will students learn?"
                  value={Array.isArray(field.value) ? field.value.join('\n') : ''}
                  onChange={(e) => field.onChange(e.target.value.split('\n').filter(item => item.trim() !== ''))}
                  className="min-h-24"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="requirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Requirements</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="What are the prerequisites for this class?"
                  value={Array.isArray(field.value) ? field.value.join('\n') : ''}
                  onChange={(e) => field.onChange(e.target.value.split('\n').filter(item => item.trim() !== ''))}
                  className="min-h-24"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="items_to_bring"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Items to Bring</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="What should students bring to class?"
                  value={Array.isArray(field.value) ? field.value.join('\n') : ''}
                  onChange={(e) => field.onChange(e.target.value.split('\n').filter(item => item.trim() !== ''))}
                  className="min-h-24"
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

export default ClassDetails;
