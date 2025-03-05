
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
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
      toast.error("Passwords don't match");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      toast.error("Password too short");
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
            <div className="space-y-4">
              <Alert variant="destructive" className="bg-red-50 border-red-200">
                <AlertCircle className="h-5 w-5" />
                <AlertTitle>Reset link is invalid or has expired</AlertTitle>
                <AlertDescription>
                  {errorDescription || "Please request a new password reset link."}
                </AlertDescription>
              </Alert>
              <Button 
                onClick={() => {
                  navigate("/password-reset");
                  setInvalidLink(false);
                }} 
                className="w-full"
              >
                Request New Reset Link
              </Button>
              <Button
                variant="outline"
                className="w-full"
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
                  placeholder="Your email address"
                />
              </div>
              
              {errorMessage && (
                <Alert variant="destructive" className="bg-red-50 border-red-200">
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}
              
              <Button type="submit" className="w-full" disabled={loading} isLoading={loading} loadingText="Sending...">
                Send Reset Link
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
                  placeholder="Enter new password"
                  minLength={6}
                />
                <p className="text-xs text-neutral-500">Password must be at least 6 characters long</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm new password"
                />
              </div>
              
              {errorMessage && (
                <Alert variant="destructive" className="bg-red-50 border-red-200">
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}
              
              <Button type="submit" className="w-full" disabled={loading} isLoading={loading} loadingText="Updating...">
                Update Password
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
