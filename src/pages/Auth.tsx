
import { useEffect, useState } from "react";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, Loader2 } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [debugMode, setDebugMode] = useState(false);
  
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
      // Enable debug mode for multiple failed attempts
      if (debugMode) {
        console.log("DEBUG MODE ENABLED");
        console.log("Testing Supabase connection...");
        
        try {
          const { data: connTest, error: connError } = await supabase.from('profiles').select('count').limit(1);
          console.log("Connection test:", { data: connTest, error: connError });
        } catch (connErr) {
          console.error("Connection test failed:", connErr);
        }
      }
      
      console.log("Attempting login with:", { email, password });
      
      // Make sure email is lower case to avoid case sensitivity issues
      const lowerCaseEmail = email.toLowerCase().trim();
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: lowerCaseEmail,
        password,
      });

      console.log("Login response:", { data, error });
      
      if (error) {
        // If this is the second failed attempt, enable debug mode
        if (error.message === "Invalid login credentials") {
          setDebugMode(true);
        }
        throw error;
      }
      
      toast.success("Login successful");
    } catch (error: any) {
      console.error("Login error:", error);
      
      // More user-friendly error message
      if (error.message === "Invalid login credentials") {
        setError("The email or password you entered is incorrect. Please check your credentials and try again.");
      } else {
        setError(error.message || "Failed to sign in");
      }
      
      toast.error(error.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Make sure email is lower case to avoid case sensitivity issues
      const lowerCaseEmail = email.toLowerCase().trim();
      
      const { data, error } = await supabase.auth.signUp({
        email: lowerCaseEmail,
        password,
      });

      console.log("Signup response:", { data, error });
      
      if (error) throw error;
      
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        throw new Error("This email is already registered. Please log in instead.");
      }
      
      toast.success("Signup successful! Please check your email for verification.");
    } catch (error: any) {
      console.error("Signup error:", error);
      setError(error.message || "Failed to sign up");
      toast.error(error.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };
  
  const handleTestLogin = async () => {
    setEmail("test.student@classcorner.demo");
    setPassword("classcorner2024");
    
    // Set a small delay to allow state to update
    setTimeout(() => {
      const form = document.getElementById('login-form') as HTMLFormElement;
      if (form) {
        form.dispatchEvent(new Event('submit', { cancelable: true }));
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold">Welcome Back</h1>
          <p className="text-neutral-600 mt-2">Sign in to continue to ClassCorner</p>
        </div>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            <TabsTrigger value="social">Social Login</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin">
            <Card>
              <CardContent className="pt-6">
                <form id="login-form" onSubmit={handleLogin} className="space-y-4">
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
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : "Sign in"}
                  </Button>
                </form>

                <div className="mt-4">
                  <Alert className="bg-blue-50 text-blue-800 border-blue-100">
                    <InfoIcon className="h-4 w-4 text-blue-500" />
                    <AlertDescription>
                      <p>To test the app, you can use:</p>
                      <div className="mt-1 flex items-center justify-between">
                        <div>
                          <p><strong>Email:</strong> test.student@classcorner.demo</p>
                          <p><strong>Password:</strong> classcorner2024</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={handleTestLogin}
                          className="ml-2"
                        >
                          Auto-fill
                        </Button>
                      </div>
                    </AlertDescription>
                  </Alert>
                </div>
                
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
          
          <TabsContent value="signup">
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Choose a password"
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
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing up...
                      </>
                    ) : "Sign up"}
                  </Button>
                </form>
                
                <div className="mt-4 text-center">
                  <p className="text-sm text-neutral-600">
                    Already have an account?{" "}
                    <Button
                      variant="link"
                      className="p-0 h-auto font-medium"
                      onClick={() => document.querySelector('[value="signin"]')?.dispatchEvent(new Event('click'))}
                    >
                      Sign in
                    </Button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="social">
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
        
        <div className="mt-6 text-center">
          <Link to="/create-test-accounts" className="text-sm text-neutral-600 hover:underline">
            Create Test Accounts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
