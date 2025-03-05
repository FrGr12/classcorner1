
import { useEffect, useState } from "react";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Get return path from state (if available)
  const returnTo = location.state?.returnTo || "/";

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Auth: Initial session check:", session);
      setSession(session);
      
      // If user is already logged in, redirect them
      if (session) {
        navigate(returnTo);
      }
    });

    // Set up auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", _event, session);
      setSession(session);
      
      // If user logs in, redirect them to the return path
      if (session) {
        toast.success("Login successful");
        navigate(returnTo);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, returnTo]);

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("Login error:", error);
        setErrorMessage(error.message);
        toast.error(error.message);
      } else if (data?.session) {
        toast.success("Login successful");
        navigate(returnTo);
      }
    } catch (error: any) {
      console.error("Unexpected login error:", error);
      setErrorMessage(error.message || "An unexpected error occurred");
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleManualSignup = async () => {
    setLoading(true);
    setErrorMessage(null);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        }
      });
      
      if (error) {
        console.error("Signup error:", error);
        setErrorMessage(error.message);
        toast.error(error.message);
      } else {
        toast.success("Signup successful! Please check your email for verification.");
      }
    } catch (error: any) {
      console.error("Unexpected signup error:", error);
      setErrorMessage(error.message || "An unexpected error occurred");
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Console log current window URL for debugging
  useEffect(() => {
    console.log("Current URL:", window.location.href);
    console.log("Redirect URL will be:", `${window.location.origin}/auth/callback`);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold">Welcome Back</h1>
          <p className="text-neutral-600 mt-2">Sign in to continue to ClassCorner</p>
        </div>

        {/* Manual login form */}
        <div className="space-y-4 mb-8">
          <form onSubmit={handleManualLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
              />
            </div>
            
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded">
                {errorMessage}
              </div>
            )}
            
            <div className="flex flex-col gap-2 pt-2">
              <Button 
                type="submit" 
                className="w-full"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
              
              <Button 
                type="button"
                variant="outline" 
                className="w-full"
                onClick={handleManualSignup}
                disabled={loading}
              >
                {loading ? "Processing..." : "Sign Up"}
              </Button>
            </div>
          </form>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <SupabaseAuth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#9b87f5',
                  brandAccent: '#8b74f5'
                }
              }
            }
          }}
          providers={["google"]}
          redirectTo={`${window.location.origin}/auth/callback`}
        />

        <div className="mt-6 text-center space-y-2">
          <Button
            variant="link"
            className="text-sm text-neutral-600"
            onClick={() => navigate("/password-reset")}
          >
            Forgot your password?
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
