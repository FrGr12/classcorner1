
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";

const PasswordReset = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      setErrorMessage(errorDescription || "Error processing reset link. Please request a new one.");
      console.error("Password reset error:", errorParam, errorDescription, errorCode);
    }
    
    // If we have a token, set the session
    if (accessToken) {
      // Set the session using the token
      supabase.auth.getSession().then(({ data, error }) => {
        if (error) {
          console.error("Session error:", error);
          setErrorMessage("Error processing reset token. Please request a new link.");
          toast.error("Error processing reset token. Please request a new link.");
        } else {
          console.log("Session data:", data);
        }
      });
    }

    // Log the current URL for debugging
    console.log("Current URL:", window.location.href);
  }, [accessToken, errorParam, errorDescription, errorCode]);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      console.log("Requesting password reset for:", email);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/password-reset`,
      });

      if (error) throw error;

      toast.success("Reset link sent. Check your email for the password reset link");
    } catch (error: any) {
      console.error("Reset request error:", error);
      setErrorMessage(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match. Please make sure both passwords are the same");
      toast.error("Passwords don't match. Please make sure both passwords are the same");
      return;
    }

    setLoading(true);

    try {
      console.log("Updating password");
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      toast.success("Password updated successfully");
      
      navigate("/auth");
    } catch (error: any) {
      console.error("Password update error:", error);
      setErrorMessage(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            {errorParam 
              ? "Link Error" 
              : accessToken 
                ? "Reset Password" 
                : "Forgot Password"}
          </CardTitle>
          <CardDescription>
            {errorParam 
              ? "There was a problem with your reset link" 
              : accessToken
                ? "Enter your new password below"
                : "Enter your email to receive a password reset link"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {errorParam ? (
            <div className="space-y-4">
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Reset link is invalid or has expired</p>
                  <p className="text-sm mt-1">{errorDescription || "Please request a new password reset link."}</p>
                </div>
              </div>
              <Button 
                onClick={() => navigate("/password-reset")} 
                className="w-full"
              >
                Request New Reset Link
              </Button>
              <Button
                variant="outline"
                className="w-full mt-2"
                onClick={() => navigate("/auth")}
              >
                Back to Login
              </Button>
            </div>
          ) : !accessToken ? (
            <form onSubmit={handleRequestReset} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded">
                  {errorMessage}
                </div>
              )}
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
              
              <Button
                variant="link"
                className="w-full"
                onClick={() => navigate("/auth")}
              >
                Back to Login
              </Button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded">
                  {errorMessage}
                </div>
              )}
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Updating..." : "Update Password"}
              </Button>
              
              <Button
                variant="link"
                className="w-full"
                onClick={() => navigate("/auth")}
              >
                Back to Login
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordReset;
