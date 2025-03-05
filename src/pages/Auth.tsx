
import { useEffect, useState } from "react";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  
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

  // Console log current window URL for debugging
  useEffect(() => {
    console.log("Current URL:", window.location.href);
    console.log("Redirect URL will be:", `${window.location.origin}/auth/callback`);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log("Attempting login with:", { email, password });
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("Login response:", { data, error });
      
      if (error) throw error;
      
      toast.success("Login successful");
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.message);
      toast.error(error.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold">Welcome Back</h1>
          <p className="text-neutral-600 mt-2">Sign in to continue to ClassCorner</p>
        </div>

        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="supabase">Social Login</TabsTrigger>
          </TabsList>
          
          <TabsContent value="email">
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
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
                  
                  {error && (
                    <div className="p-3 text-sm bg-red-50 border border-red-100 text-red-600 rounded">
                      {error}
                    </div>
                  )}
                  
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Sign in"}
                  </Button>
                </form>
                
                <div className="mt-4 text-center">
                  <Button
                    variant="link"
                    className="text-sm text-neutral-600"
                    onClick={() => navigate("/password-reset")}
                  >
                    Forgot your password?
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="supabase">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
