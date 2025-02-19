
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, SkipForward } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface QuizStep {
  question: string;
  options: string[];
}

const quizSteps: QuizStep[] = [
  {
    question: "What type of creative activities interest you the most?",
    options: [
      "Visual Arts (Painting, Photography)",
      "Crafts (Pottery, Jewelry)",
      "Culinary Arts (Cooking, Baking)",
      "Performance (Music, Dance)"
    ]
  },
  {
    question: "Where would you prefer to take classes?",
    options: [
      "Stockholm",
      "Göteborg",
      "Malmö",
      "Uppsala",
      "No preference"
    ]
  }
];

export function OnboardingQuiz() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  
  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentStep < quizSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    navigate("/browse");
  };

  const handleComplete = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Map interests based on first answer
        const interests = answers[0]?.includes("Visual Arts") 
          ? ["Painting & Art", "Photography"]
          : answers[0]?.includes("Crafts")
          ? ["Pottery", "Jewellery & Metal"]
          : answers[0]?.includes("Culinary")
          ? ["Cooking", "Baking"]
          : ["Music & Dance"];

        // Save user preferences
        const { error } = await supabase
          .from('user_preferences')
          .upsert({
            id: user.id,
            interests: interests,
            preferred_location: answers[1] === "No preference" ? null : answers[1]
          });

        if (error) throw error;

        // Update onboarding steps
        await supabase
          .from('onboarding_steps')
          .upsert({
            user_id: user.id,
            interests_completed: true,
            location_completed: true
          });

        toast({
          title: "Preferences saved",
          description: "We'll use these to personalize your recommendations.",
        });
      }

      navigate("/browse");
    } catch (error) {
      console.error("Error saving preferences:", error);
      // Still navigate even if saving fails
      navigate("/browse");
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          Help us personalize your experience
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-lg font-medium mb-4">
          {quizSteps[currentStep].question}
        </div>
        <div className="grid gap-2">
          {quizSteps[currentStep].options.map((option) => (
            <Button
              key={option}
              variant={answers[currentStep] === option ? "default" : "outline"}
              className="w-full justify-start text-left h-auto py-3"
              onClick={() => handleAnswer(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          {currentStep > 0 && (
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}
          <Button variant="ghost" onClick={handleSkip}>
            <SkipForward className="h-4 w-4 mr-2" />
            Skip
          </Button>
        </div>
        <Button
          onClick={handleNext}
          disabled={!answers[currentStep]}
        >
          {currentStep === quizSteps.length - 1 ? "Complete" : "Next"}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}
