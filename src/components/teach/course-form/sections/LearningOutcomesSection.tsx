
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { CourseFormValues } from '../CourseFormContext';
import { X, Plus } from 'lucide-react';

interface LearningOutcomesSectionProps {
  form: UseFormReturn<CourseFormValues>;
}

const LearningOutcomesSection = ({ form }: LearningOutcomesSectionProps) => {
  const { setValue, getValues } = form;

  const addOutcome = () => {
    const currentOutcomes = getValues("learning_outcomes") || [];
    setValue("learning_outcomes", [...currentOutcomes, '']);
  };

  const removeOutcome = (index: number) => {
    const currentOutcomes = getValues("learning_outcomes") || [];
    setValue(
      "learning_outcomes",
      currentOutcomes.filter((_, i) => i !== index)
    );
  };

  const updateOutcome = (index: number, value: string) => {
    const currentOutcomes = getValues("learning_outcomes") || [];
    const updatedOutcomes = [...currentOutcomes];
    updatedOutcomes[index] = value;
    setValue("learning_outcomes", updatedOutcomes);
  };

  return (
    <Card className="p-6 mt-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Learning Outcomes</h3>
          <p className="text-sm text-muted-foreground">What will students learn from your class?</p>
        </div>

        <div className="space-y-4">
          {(getValues("learning_outcomes") || []).map((outcome, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={outcome}
                onChange={(e) => updateOutcome(index, e.target.value)}
                placeholder={`Outcome ${index + 1}`}
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeOutcome(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addOutcome}
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" /> Add Outcome
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default LearningOutcomesSection;
