import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { ClassItem } from "@/types/class";

const PaymentFailed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const error = location.state?.error as string;
  const classItem = location.state?.classItem as ClassItem;

  const handleRetry = () => {
    if (classItem) {
      navigate("/payment", { state: { classItem } });
    } else {
      navigate("/browse");
    }
  };

  const handleContact = () => {
    window.location.href = "mailto:support@classcorner.com";
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="outline"
            size="lg"
            className="mb-6 gap-2 text-base hover:bg-neutral-100"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </Button>

          <Card className="w-full">
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
      </main>
      <Footer />
    </div>
  );
};

export default PaymentFailed;