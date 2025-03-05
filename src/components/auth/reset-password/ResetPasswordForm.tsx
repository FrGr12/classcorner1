
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
  );
};

export default ResetPasswordForm;
