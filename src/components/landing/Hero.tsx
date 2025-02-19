
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { OnboardingQuiz } from "./quiz/OnboardingQuiz";

const Hero = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
        {!showQuiz ? (
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Discover and Book Amazing Local Classes
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Join a community of learners and creators. Find the perfect class to explore your interests and develop new skills.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button 
                size="lg"
                className="bg-accent-purple hover:bg-accent-purple/90"
                onClick={() => setShowQuiz(true)}
              >
                Find Your Perfect Class
              </Button>
            </div>
          </div>
        ) : (
          <OnboardingQuiz />
        )}
      </div>
    </div>
  );
};

export default Hero;
