
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

interface BringItemsSectionProps {
  form: UseFormReturn<CourseFormValues>;
}

const BringItemsSection = ({ form }: BringItemsSectionProps) => {
  const { setValue, getValues } = form;

  const addItem = () => {
    const currentItems = getValues("items_to_bring") || [];
    setValue("items_to_bring", [...currentItems, '']);
  };

  const removeItem = (index: number) => {
    const currentItems = getValues("items_to_bring") || [];
    setValue(
      "items_to_bring",
      currentItems.filter((_, i) => i !== index)
    );
  };

  const updateItem = (index: number, value: string) => {
    const currentItems = getValues("items_to_bring") || [];
    const updatedItems = [...currentItems];
    updatedItems[index] = value;
    setValue("items_to_bring", updatedItems);
  };

  return (
    <Card className="p-6 mt-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Items Students Should Bring</h3>
          <p className="text-sm text-muted-foreground">List any items participants need to bring to class</p>
        </div>

        <div className="space-y-4">
          {(getValues("items_to_bring") || []).map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={item}
                onChange={(e) => updateItem(index, e.target.value)}
                placeholder={`Item ${index + 1}`}
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeItem(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addItem}
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" /> Add Item
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default BringItemsSection;
