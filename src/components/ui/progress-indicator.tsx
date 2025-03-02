
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  label: string;
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export const ProgressIndicator = ({
  steps,
  currentStep,
  className
}: ProgressIndicatorProps) => {
  return (
    <div className={cn("w-full", className)}>
      {/* Mobile steps (text only) */}
      <div className="flex items-center justify-between md:hidden">
        <span className="text-sm font-medium">
          Step {currentStep + 1} of {steps.length}
        </span>
        <span className="text-sm font-medium text-muted-foreground">
          {steps[currentStep]?.label || ""}
        </span>
      </div>

      {/* Desktop steps (full indicator) */}
      <ol className="hidden md:flex items-center w-full">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <li 
              key={step.id} 
              className={cn(
                "flex items-center relative",
                index < steps.length - 1 ? "flex-1" : ""
              )}
            >
              <div className="flex items-center">
                <div 
                  className={cn(
                    "rounded-full flex items-center justify-center transition-colors",
                    isCompleted ? "bg-accent-purple text-white h-8 w-8" :
                    isCurrent ? "bg-accent-purple/20 border border-accent-purple text-accent-purple h-8 w-8" :
                    "bg-muted border border-input text-muted-foreground h-8 w-8"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span className="text-sm">{index + 1}</span>
                  )}
                </div>
                <span 
                  className={cn(
                    "ml-2 text-sm font-medium",
                    isCurrent ? "text-accent-purple" : 
                    isCompleted ? "text-muted-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line between steps */}
              {index < steps.length - 1 && (
                <div 
                  className={cn(
                    "h-0.5 w-full ml-2",
                    isCompleted ? "bg-accent-purple" : "bg-muted"
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>

      {/* Progress bar for mobile */}
      <div className="mt-2 h-2 w-full bg-muted rounded-full overflow-hidden md:hidden">
        <div 
          className="h-full bg-accent-purple transition-all duration-300 ease-in-out rounded-full"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
};
