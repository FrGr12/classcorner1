
import React from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Plus } from 'lucide-react';
import { CourseFormValues } from '../CourseFormContext';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

interface LearningOutcomesSectionProps {
  form: UseFormReturn<CourseFormValues>;
}

const LearningOutcomesSection = ({ form }: LearningOutcomesSectionProps) => {
  const { control, register } = form;
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "learning_outcomes"
  });
  
  const handleAddOutcome = () => {
    append('');
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Learning Outcomes</h3>
          <p className="text-sm text-muted-foreground">Define what students will learn in your class</p>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <FormField
                control={control}
                name={`learning_outcomes.${index}`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input 
                        placeholder={`Outcome ${index + 1}`} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="button" 
                variant="ghost" 
                size="icon"
                onClick={() => remove(index)}
                className="h-10 w-10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleAddOutcome}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Learning Outcome
        </Button>
      </div>
    </Card>
  );
};

export default LearningOutcomesSection;
