
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";

interface LearningOutcomesSectionProps {
  form: UseFormReturn<any>;
}

const LearningOutcomesSection = ({ form }: LearningOutcomesSectionProps) => {
  const [currentOutcome, setCurrentOutcome] = useState("");

  const addLearningOutcome = () => {
    if (currentOutcome.trim()) {
      const currentOutcomes = form.getValues("learningOutcomes");
      form.setValue("learningOutcomes", [...currentOutcomes, currentOutcome.trim()]);
      setCurrentOutcome("");
    }
  };

  const removeLearningOutcome = (index: number) => {
    const currentOutcomes = form.getValues("learningOutcomes");
    form.setValue("learningOutcomes", currentOutcomes.filter((_, i) => i !== index));
  };

  return (
    <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
      <CardContent className="p-3 sm:p-4 space-y-3 sm:space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr_auto] gap-2 sm:gap-4">
          <span className="text-xs sm:text-sm font-medium text-primary">Learning Outcomes</span>
          <div className="flex gap-2 w-full">
            <Input
              value={currentOutcome}
              onChange={(e) => setCurrentOutcome(e.target.value)}
              placeholder="Add learning outcome..."
              className="flex-1 bg-white border-neutral-200 text-xs sm:text-sm h-9 sm:h-10"
              onKeyPress={(e) => e.key === 'Enter' && addLearningOutcome()}
            />
            <Button 
              type="button" 
              onClick={addLearningOutcome}
              className="bg-accent-purple hover:bg-accent-purple/90 text-white text-xs sm:text-sm h-9 sm:h-10 px-3 flex-shrink-0"
            >
              Add
            </Button>
          </div>
        </div>
        <div className="pl-0 sm:pl-[180px]">
          <ul className="space-y-2">
            {form.watch("learningOutcomes").map((outcome: string, index: number) => (
              <li key={index} className="flex items-center gap-2 bg-white p-2 rounded-md border border-neutral-200">
                <span className="flex-1 text-primary text-xs sm:text-sm">{outcome}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeLearningOutcome(index)}
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

export default LearningOutcomesSection;
