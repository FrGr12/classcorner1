
import { useEffect, useState } from "react";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [session, setSession] = useState<any>(null);
  const { t, language } = useLanguage();
  
  // Get return path from state (if available)
  const returnTo = location.state?.returnTo || "/";

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      
      // If user is already logged in, redirect them
      if (session) {
        navigate(returnTo);
      }
    });

    // Set up auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      
      // If user logs in, redirect them to the return path
      if (session) {
        navigate(returnTo);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, returnTo]);

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold">{t('auth.welcomeBack')}</h1>
          <p className="text-neutral-600 mt-2">{t('auth.signInContinue')}</p>
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
          localization={{
            variables: {
              sign_in: {
                email_label: language === 'sv' ? 'E-postadress' : 'Email address',
                password_label: language === 'sv' ? 'Lösenord' : 'Password',
                button_label: language === 'sv' ? 'Logga in' : 'Sign in',
              },
              sign_up: {
                email_label: language === 'sv' ? 'E-postadress' : 'Email address',
                password_label: language === 'sv' ? 'Lösenord' : 'Password',
                button_label: language === 'sv' ? 'Registrera' : 'Sign up',
              }
            }
          }}
        />

        <div className="mt-6 text-center space-y-2">
          <Button
            variant="link"
            className="text-sm text-neutral-600"
            onClick={() => navigate("/password-reset")}
          >
            {t('auth.forgotPassword')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
