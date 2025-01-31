import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { XCircle, RefreshCcw, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PaymentFailed = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const errorMessage = searchParams.get("error") || "An error occurred during payment processing";
  const courseId = searchParams.get("courseId");
  const sessionId = searchParams.get("sessionId");

  const handleRetry = () => {
    if (courseId && sessionId) {
      navigate(`/payment?courseId=${courseId}&sessionId=${sessionId}`);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Missing course or session information",
      });
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-neutral-50 pt-24">
      <div className="container-padding max-w-2xl mx-auto">
        <div className="glass-panel rounded-2xl p-8 text-center space-y-6">
          <div className="flex justify-center">
            <XCircle className="h-16 w-16 text-red-500" />
          </div>
          
          <h1 className="text-2xl font-semibold text-neutral-800">
            Payment Failed
          </h1>
          
          <p className="text-neutral-600">
            {errorMessage}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              onClick={handleRetry}
              className="bg-accent-purple hover:bg-accent-purple/90 text-white flex items-center gap-2"
            >
              <RefreshCcw className="h-4 w-4" />
              Try Again
            </Button>
            
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          </div>

          <p className="text-sm text-neutral-500 pt-4">
            If you continue to experience issues, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;