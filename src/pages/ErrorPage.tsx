
import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const ErrorPage = () => {
  const error = useRouteError();
  const { t } = useLanguage();
  
  let errorMessage = t('error.unexpected');
  
  if (isRouteErrorResponse(error)) {
    errorMessage = error.data?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <main className="flex items-center justify-center flex-col container-padding pt-32 pb-16">
        <div className="max-w-md text-center space-y-6">
          <h1 className="text-4xl font-bold text-destructive">{t('error.oops')}</h1>
          <h2 className="text-2xl font-semibold text-neutral-800">{t('error.somethingWrong')}</h2>
          <p className="text-neutral-600">{errorMessage}</p>
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <Link to="/">{t('error.goHome')}</Link>
            </Button>
            <Button variant="outline" onClick={() => window.location.reload()}>
              {t('error.tryAgain')}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ErrorPage;
