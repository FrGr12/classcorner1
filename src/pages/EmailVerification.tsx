import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [verificationStatus, setVerificationStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    verifyEmail();
  }, []);

  const verifyEmail = async () => {
    try {
      const token = searchParams.get("token");
      const email = searchParams.get("email");
      const type = searchParams.get("type");

      if (type !== "signup" && type !== "recovery") {
        throw new Error("Invalid verification type");
      }

      if (!token) {
        throw new Error("No verification token found");
      }

      if (!email) {
        throw new Error("No email found");
      }

      const { error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: "signup"
      });

      if (error) throw error;

      setVerificationStatus("success");
      toast({
        title: "Email verified successfully",
        description: "You can now sign in to your account",
      });

      // Redirect to login after a short delay
      setTimeout(() => {
        navigate("/auth");
      }, 3000);
    } catch (error: any) {
      console.error("Verification error:", error);
      setVerificationStatus("error");
      setErrorMessage(error.message || "Failed to verify email");
      toast({
        variant: "destructive",
        title: "Verification failed",
        description: error.message || "Failed to verify email",
      });
    }
  };

  const handleRetry = () => {
    setVerificationStatus("loading");
    verifyEmail();
  };

  const handleContactSupport = () => {
    window.location.href = "mailto:support@classcorner.com";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-sm">
        {verificationStatus === "loading" && (
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Verifying your email</h2>
            <p className="text-neutral-600">Please wait while we verify your email address...</p>
          </div>
        )}

        {verificationStatus === "success" && (
          <div className="text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Email Verified!</h2>
            <p className="text-neutral-600 mb-4">
              Your email has been successfully verified. You will be redirected to the login page shortly.
            </p>
            <Button onClick={() => navigate("/auth")} className="w-full">
              Go to Login
            </Button>
          </div>
        )}

        {verificationStatus === "error" && (
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Verification Failed</h2>
            <p className="text-neutral-600 mb-4">{errorMessage}</p>
            <div className="space-y-3">
              <Button onClick={handleRetry} variant="outline" className="w-full">
                Try Again
              </Button>
              <Button onClick={handleContactSupport} variant="secondary" className="w-full">
                Contact Support
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;