
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
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
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap className="w-5 h-5 text-accent-purple" />
          <h3 className="text-lg font-medium">Learning Outcomes</h3>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={currentOutcome}
              onChange={(e) => setCurrentOutcome(e.target.value)}
              placeholder="Add learning outcome..."
              onKeyPress={(e) => e.key === 'Enter' && addLearningOutcome()}
            />
            <Button type="button" onClick={addLearningOutcome}>Add</Button>
          </div>
          <ul className="space-y-2">
            {form.watch("learningOutcomes").map((outcome: string, index: number) => (
              <li key={index} className="flex items-center gap-2 bg-white/50 p-2 rounded-md">
                <span className="flex-1">{outcome}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeLearningOutcome(index)}
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
