import { Link } from "react-router-dom";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <main className="flex items-center justify-center flex-col container-padding pt-32 pb-16">
        <div className="max-w-md text-center space-y-6">
          <h1 className="text-6xl font-bold text-accent-purple">404</h1>
          <h2 className="text-2xl font-semibold text-neutral-800">Page Not Found</h2>
          <p className="text-neutral-600">
            Sorry, we couldn't find the page you're looking for. It might have been
            removed, renamed, or doesn't exist.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <Link to="/">Go Home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/browse">Browse Classes</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;