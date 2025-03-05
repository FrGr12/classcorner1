
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { CourseFormValues } from '../CourseFormContext';
import { Card } from '@/components/ui/card';

interface LearningOutcomesSectionProps {
  form: UseFormReturn<CourseFormValues>;
}

const LearningOutcomesSection = ({ form }: LearningOutcomesSectionProps) => {
  return (
    <Card className="p-6 mt-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Learning Outcomes</h3>
          <p className="text-sm text-muted-foreground">What will students learn?</p>
        </div>
        
        <FormField
          control={form.control}
          name="learning_outcomes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Learning Outcomes</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="List learning outcomes (one per line)"
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

export default LearningOutcomesSection;
