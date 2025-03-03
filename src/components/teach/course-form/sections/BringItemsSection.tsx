
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { CourseFormValues } from '../CourseFormContext';
import { Card } from '@/components/ui/card';

interface BringItemsSectionProps {
  form: UseFormReturn<CourseFormValues>;
}

const BringItemsSection = ({ form }: BringItemsSectionProps) => {
  return (
    <Card className="p-6 mt-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Items to Bring</h3>
          <p className="text-sm text-muted-foreground">What should students bring to class?</p>
        </div>
        
        <FormField
          control={form.control}
          name="items_to_bring"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Items to Bring</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="List items students should bring (one per line)"
                  value={Array.isArray(field.value) ? field.value.join('\n') : ''}
                  onChange={(e) => {
                    field.onChange(e.target.value.split('\n').filter(item => item.trim() !== ''));
                  }}
                  className="min-h-[200px]"
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

export default BringItemsSection;
