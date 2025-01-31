import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [verificationStatus, setVerificationStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
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
          description: "You can now log in to your account",
        });

        // Redirect to login after a short delay
        setTimeout(() => {
          navigate("/auth");
        }, 3000);

      } catch (error: any) {
        console.error("Verification error:", error);
        setVerificationStatus("error");
        toast({
          variant: "destructive",
          title: "Verification failed",
          description: error.message,
        });
      }
    };

    verifyEmail();
  }, [searchParams, navigate, toast]);

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center">
            {verificationStatus === "loading" && (
              <Loader2 className="w-6 h-6 text-neutral-600 animate-spin" />
            )}
            {verificationStatus === "success" && (
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            )}
            {verificationStatus === "error" && (
              <XCircle className="w-6 h-6 text-red-600" />
            )}
          </div>
          <CardTitle>
            {verificationStatus === "loading" && "Verifying Email"}
            {verificationStatus === "success" && "Email Verified"}
            {verificationStatus === "error" && "Verification Failed"}
          </CardTitle>
          <CardDescription className="mt-2">
            {verificationStatus === "loading" && "Please wait while we verify your email address..."}
            {verificationStatus === "success" && "Your email has been verified successfully. You will be redirected to login."}
            {verificationStatus === "error" && "We couldn't verify your email. The link may have expired or is invalid."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {verificationStatus === "error" && (
            <>
              <Button
                onClick={() => navigate("/auth")}
                className="w-full"
              >
                Return to Login
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = "mailto:support@classcorner.com"}
                className="w-full"
              >
                Contact Support
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailVerification;