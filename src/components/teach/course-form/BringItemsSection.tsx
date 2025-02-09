
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface BringItemsSectionProps {
  form: UseFormReturn<any>;
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
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Package className="w-5 h-5 text-accent-purple" />
          <h3 className="text-lg font-medium">What to Bring</h3>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={currentBringItem}
              onChange={(e) => setCurrentBringItem(e.target.value)}
              placeholder="Add item..."
              onKeyPress={(e) => e.key === 'Enter' && addBringItem()}
            />
            <Button type="button" onClick={addBringItem}>Add</Button>
          </div>
          <ul className="space-y-2">
            {form.watch("whatToBring").map((item: string, index: number) => (
              <li key={index} className="flex items-center gap-2 bg-white/50 p-2 rounded-md">
                <span className="flex-1">{item}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeBringItem(index)}
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
