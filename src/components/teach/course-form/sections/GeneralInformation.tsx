
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { CourseFormValues } from '../CourseFormContext';

interface GeneralInformationProps {
  form: UseFormReturn<CourseFormValues>;
}

const GeneralInformation = ({ form }: GeneralInformationProps) => {
  return (
    <Card className="p-6 mt-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">General Information</h3>
          <p className="text-sm text-muted-foreground">Provide basic information about your class</p>
        </div>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Introduction to Pottery" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your class..." 
                  className="min-h-32" 
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

export default GeneralInformation;
