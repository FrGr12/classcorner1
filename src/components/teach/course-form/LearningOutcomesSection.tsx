
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
          <h3 className="text-lg font-medium text-primary">Learning Outcomes</h3>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={currentOutcome}
              onChange={(e) => setCurrentOutcome(e.target.value)}
              placeholder="Add learning outcome..."
              className="bg-white border-neutral-200"
              onKeyPress={(e) => e.key === 'Enter' && addLearningOutcome()}
            />
            <Button 
              type="button" 
              onClick={addLearningOutcome}
              className="bg-accent-purple hover:bg-accent-purple/90 text-white"
            >
              Add
            </Button>
          </div>
          <ul className="space-y-2">
            {form.watch("learningOutcomes").map((outcome: string, index: number) => (
              <li key={index} className="flex items-center gap-2 bg-white p-2 rounded-md border border-neutral-200">
                <span className="flex-1 text-primary">{outcome}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeLearningOutcome(index)}
                  className="text-neutral-500 hover:text-neutral-700"
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
