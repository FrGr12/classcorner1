
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card } from '@/components/ui/card';
import { CourseFormValues } from '../CourseFormContext';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

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
                  onChange={(e) => field.onChange(e.target.value.split('\n'))}
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
                  onChange={(e) => field.onChange(e.target.value.split('\n'))}
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
