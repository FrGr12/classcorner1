
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    // Check for error parameters in the URL
    const errorParam = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");
    
    if (errorParam) {
      console.error("Verification error from URL:", errorParam, errorDescription);
      setVerificationStatus("error");
      setErrorMessage(errorDescription || "Verification failed. The link may be invalid or expired.");
      toast.error(errorDescription || "Verification failed");
      return;
    }
    
    verifyEmail();
  }, [searchParams]);

  const verifyEmail = async () => {
    try {
      const token = searchParams.get("token");
      const email = searchParams.get("email");
      const type = searchParams.get("type");

      console.log("Verification params:", { token, email, type });

      if (!token) {
        throw new Error("No verification token found");
      }

      if (!email) {
        throw new Error("No email found");
      }

      if (type !== "signup" && type !== "recovery") {
        throw new Error("Invalid verification type");
      }

      // For debugging purposes, log the OTP verification request
      console.log(`Verifying OTP with: email=${email}, token=${token}, type=${type}`);
      
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: type === "signup" ? "signup" : "recovery"
      });

      console.log("OTP verification response:", { data, error });

      if (error) throw error;

      setVerificationStatus("success");
      toast.success("Email verified successfully");

      // Redirect to login after a short delay
      setTimeout(() => {
        navigate("/auth");
      }, 3000);
    } catch (error: any) {
      console.error("Verification error:", error);
      setVerificationStatus("error");
      setErrorMessage(error.message || "Failed to verify email");
      toast.error(error.message || "Failed to verify email");
    }
  };

  const handleRetry = () => {
    // Redirect to password reset page for users to request a new link
    navigate("/password-reset");
  };

  const handleContactSupport = () => {
    window.location.href = "mailto:support@classcorner.com";
  };

  const handleGoToLogin = () => {
    navigate("/auth");
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
            <Button onClick={handleGoToLogin} className="w-full">
              Go to Login
            </Button>
          </div>
        )}

        {verificationStatus === "error" && (
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Verification Failed</h2>
            <Alert variant="destructive" className="mb-4">
              <AlertDescription className="text-center">
                {errorMessage}
              </AlertDescription>
            </Alert>
            <div className="space-y-3">
              <Button onClick={handleRetry} variant="outline" className="w-full">
                Request New Link
              </Button>
              <Button onClick={handleGoToLogin} variant="default" className="w-full">
                Go to Login
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
