import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { AuthError, AuthApiError } from "@supabase/supabase-js";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userType, setUserType] = useState<"student" | "teacher" | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN") {
        navigate("/onboarding");
      }
      if (event === "SIGNED_OUT") {
        setErrorMessage("");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleUserTypeSelect = (type: "student" | "teacher") => {
    setUserType(type);
  };

  const getErrorMessage = (error: AuthError) => {
    if (error instanceof AuthApiError) {
      switch (error.code) {
        case "invalid_credentials":
          return "Invalid email or password. Please check your credentials and try again.";
        case "email_not_confirmed":
          return "Please verify your email address before signing in.";
        case "user_not_found":
          return "No user found with these credentials.";
        default:
          return error.message;
      }
    }
    return error.message;
  };

  if (!userType) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome to ClassCorner</CardTitle>
            <CardDescription>Choose how you want to use the platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => handleUserTypeSelect("student")}
              className="w-full h-24 text-lg"
              variant="outline"
            >
              I want to book a class
            </Button>
            <Button
              onClick={() => handleUserTypeSelect("teacher")}
              className="w-full h-24 text-lg"
              variant="outline"
            >
              I want to teach classes
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {userType === "student" ? "Book Amazing Classes" : "Start Teaching"}
          </CardTitle>
          <CardDescription>
            {userType === "student" 
              ? "Join our community of learners"
              : "Share your skills with others"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {errorMessage}
            </div>
          )}
          <SupabaseAuth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#141413',
                    brandAccent: '#8989DE',
                  },
                },
              },
            }}
            providers={["google"]}
            redirectTo={`${window.location.origin}/auth/callback`}
            additionalData={{
              user_type: userType,
            }}
          />
          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => navigate("/auth/reset-password")}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Forgot your password?
            </Button>
          </div>
          <Button
            variant="link"
            className="w-full mt-2"
            onClick={() => setUserType(null)}
          >
            ← Choose a different role
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;