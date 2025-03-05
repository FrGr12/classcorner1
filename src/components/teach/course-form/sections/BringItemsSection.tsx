
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { CourseFormValues } from "../CourseFormContext";

interface BringItemsSectionProps {
  form: UseFormReturn<CourseFormValues>;
}

const BringItemsSection = ({ form }: BringItemsSectionProps) => {
  const [currentBringItem, setCurrentBringItem] = useState("");

  const addBringItem = () => {
    if (currentBringItem.trim()) {
      const currentItems = form.getValues("whatToBring");
      form.setValue("whatToBring", [...currentItems, currentBringItem.trim()]);
      setCurrentBringItem("");
    }
  };

  const removeBringItem = (index: number) => {
    const currentItems = form.getValues("whatToBring");
    form.setValue("whatToBring", currentItems.filter((_, i) => i !== index));
  };

  return (
    <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
      <CardContent className="p-3 sm:p-4 space-y-3 sm:space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr_auto] gap-2 sm:gap-4">
          <span className="text-xs sm:text-sm font-medium text-primary">What to Bring</span>
          <div className="flex gap-2 w-full">
            <Input
              value={currentBringItem}
              onChange={(e) => setCurrentBringItem(e.target.value)}
              placeholder="Add item..."
              className="flex-1 bg-white border-neutral-200 text-xs sm:text-sm h-9 sm:h-10"
              onKeyPress={(e) => e.key === 'Enter' && addBringItem()}
            />
            <Button 
              type="button" 
              onClick={addBringItem}
              className="bg-accent-purple hover:bg-accent-purple/90 text-white text-xs sm:text-sm h-9 sm:h-10 px-3 flex-shrink-0"
            >
              Add
            </Button>
          </div>
        </div>
        <div className="pl-0 sm:pl-[180px]">
          <ul className="space-y-2">
            {form.watch("whatToBring").map((item: string, index: number) => (
              <li key={index} className="flex items-center gap-2 bg-white p-2 rounded-md border border-neutral-200">
                <span className="flex-1 text-primary text-xs sm:text-sm">{item}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeBringItem(index)}
                  className="text-neutral-500 hover:text-neutral-700 h-7 text-xs sm:text-sm flex-shrink-0"
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default BringItemsSection;
