import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

const PaymentFailed = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const error = searchParams.get("error");

  const handleRetry = () => {
    navigate("/payment");
  };

  const handleContact = () => {
    // This could be updated to link to a contact form or support page
    window.location.href = "mailto:support@classcorner.com";
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <CardTitle className="text-2xl text-red-600">Payment Failed</CardTitle>
          <CardDescription className="mt-2">
            {error || "We couldn't process your payment. Please try again or contact support if the problem persists."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleRetry}
            className="w-full"
          >
            Try Payment Again
          </Button>
          <Button
            variant="outline"
            onClick={handleContact}
            className="w-full"
          >
            Contact Support
          </Button>
          <Button
            variant="link"
            onClick={() => navigate("/browse")}
            className="w-full"
          >
            Return to Browse Classes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentFailed;