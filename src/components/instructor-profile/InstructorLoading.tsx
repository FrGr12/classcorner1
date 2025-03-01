
import { Loader2 } from "lucide-react";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";

export const InstructorLoading = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation />
      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center pt-20">
        <Loader2 className="h-8 w-8 animate-spin text-accent-purple" />
      </div>
      <Footer />
    </div>
  );
};

export default InstructorLoading;
