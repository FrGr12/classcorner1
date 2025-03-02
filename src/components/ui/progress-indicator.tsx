
import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressStep {
  id: string;
  label: string;
  description?: string;
}

interface ProgressIndicatorProps {
  steps: ProgressStep[];
  currentStep: number;
  className?: string;
}

export function ProgressIndicator({
  steps,
  currentStep,
  className,
}: ProgressIndicatorProps) {
  return (
    <div className={cn("w-full", className)}>
      {/* Mobile view - simple step counter */}
      <div className="md:hidden flex items-center justify-between mb-4">
        <span className="text-sm font-medium">
          Step {currentStep + 1} of {steps.length}
        </span>
        <span className="text-sm text-muted-foreground">
          {steps[currentStep]?.label}
        </span>
      </div>

      {/* Desktop view - full progress bar */}
      <div className="hidden md:block">
        <ol className="flex items-center w-full">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <li 
                key={step.id} 
                className={cn(
                  "flex items-center",
                  index !== steps.length - 1 ? "w-full" : "",
                )}
              >
                <div className="flex flex-col items-center">
                  <div 
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full shrink-0 text-sm font-medium border",
                      isActive && "border-accent-purple bg-accent-purple text-white",
                      isCompleted && "border-accent-purple bg-accent-purple/20 text-accent-purple",
                      !isActive && !isCompleted && "border-gray-300 text-gray-500",
                    )}
                  >
                    {isCompleted ? (
                      <svg className="w-3.5 h-3.5 text-accent-purple" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span 
                    className={cn(
                      "mt-2 text-xs font-medium",
                      isActive && "text-accent-purple",
                      isCompleted && "text-accent-purple",
                      !isActive && !isCompleted && "text-gray-500"
                    )}
                  >
                    {step.label}
                  </span>
                </div>
                
                {index !== steps.length - 1 && (
                  <div 
                    className={cn(
                      "w-full h-0.5 mx-2",
                      index < currentStep ? "bg-accent-purple" : "bg-gray-200"
                    )}
                  ></div>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {/* Progress bar for both views */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
        <div 
          className="bg-accent-purple h-2.5 rounded-full transition-all duration-300 ease-in-out" 
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
