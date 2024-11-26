import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Teach = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Application submitted successfully! We'll be in touch soon.");
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <main className="pt-32 pb-16 container-padding">
        <div className="max-w-2xl mx-auto">
          <h1 className="heading-lg mb-4">Become an Instructor</h1>
          <p className="text-neutral-600 mb-8">Share your craft with eager students in your local community.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-sm">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input required placeholder="Your name" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input required type="email" placeholder="your@email.com" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Craft Category</label>
              <select className="w-full px-4 py-2 rounded-lg border border-neutral-200">
                <option value="">Select a category</option>
                <option value="ceramics">Ceramics</option>
                <option value="painting">Painting</option>
                <option value="cooking">Cooking</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Experience</label>
              <Textarea required placeholder="Tell us about your experience..." />
            </div>
            
            <Button type="submit" className="w-full button-primary">
              Submit Application
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Teach;