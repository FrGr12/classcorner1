
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import InvalidLinkError from "./InvalidLinkError";
import RequestResetForm from "./RequestResetForm";
import ResetPasswordForm from "./ResetPasswordForm";

const PasswordResetContainer = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [invalidLink, setInvalidLink] = useState(false);

  // Check if we're in reset mode (have a token) or request mode
  const accessToken = searchParams.get("access_token");
  
  // Check for error parameters in the URL
  const errorParam = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");
  const errorCode = searchParams.get("error_code");
  
  useEffect(() => {
    console.log("Password reset params:", { accessToken, errorParam, errorDescription, errorCode });
    
    // Handle error from URL parameters
    if (errorParam) {
      setInvalidLink(true);
      setErrorMessage(errorDescription || "Error processing reset link. Please request a new one.");
      console.error("Password reset error:", errorParam, errorDescription, errorCode);
      toast.error(errorDescription || "Error processing reset link");
      return;
    }
    
    // If we have a token, set the session
    if (accessToken) {
      // Set the session using the token
      supabase.auth.getSession().then(({ data, error }) => {
        if (error) {
          console.error("Session error:", error);
          setInvalidLink(true);
          setErrorMessage("Error processing reset token. Please request a new link.");
          toast.error("Error processing reset token");
        } else {
          console.log("Session data:", data);
        }
      });
    }

    // Log the current URL for debugging
    console.log("Current URL:", window.location.href);
  }, [accessToken, errorParam, errorDescription, errorCode]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>
          {invalidLink 
            ? "Link Error" 
            : accessToken 
              ? "Reset Password" 
              : "Forgot Password"}
        </CardTitle>
        <CardDescription>
          {invalidLink 
            ? "There was a problem with your reset link" 
            : accessToken
              ? "Enter your new password below"
              : "Enter your email to receive a password reset link"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {invalidLink ? (
          <InvalidLinkError errorDescription={errorDescription} />
        ) : !accessToken ? (
          <RequestResetForm email={email} setEmail={setEmail} />
        ) : (
          <ResetPasswordForm />
        )}
      </CardContent>
    </Card>
  );
};

export default PasswordResetContainer;
