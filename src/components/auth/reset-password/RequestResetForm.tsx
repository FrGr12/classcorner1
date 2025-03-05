
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

interface RequestResetFormProps {
  email: string;
  setEmail: (email: string) => void;
}

const RequestResetForm = ({ email, setEmail }: RequestResetFormProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  return (
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
  );
};

export default RequestResetForm;
