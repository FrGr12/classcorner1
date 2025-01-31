import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Auth = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold">Welcome Back</h1>
          <p className="text-neutral-600 mt-2">Sign in to continue to ClassCorner</p>
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
        />

        <div className="mt-6 text-center">
          <Button
            variant="link"
            className="text-sm text-neutral-600"
            onClick={() => navigate("/auth/reset-password")}
          >
            Forgot your password?
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;