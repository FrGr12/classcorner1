import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, ExternalLink } from "lucide-react";

const Resources = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto space-y-12">
          <section>
            <h1 className="text-4xl font-display font-semibold mb-6">Teaching Resources</h1>
            <p className="text-lg text-neutral-600">
              Access our comprehensive collection of resources designed to help you succeed as an instructor on ClassCorner.
            </p>
          </section>

          <section className="grid gap-6">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <BookOpen className="w-8 h-8 text-accent-purple shrink-0" />
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Getting Started Guide</h3>
                  <p className="text-neutral-600">
                    Learn everything you need to know about setting up your classes, managing bookings, 
                    and growing your student base.
                  </p>
                  <Button variant="outline" className="mt-4">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <BookOpen className="w-8 h-8 text-accent-purple shrink-0" />
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Class Planning Templates</h3>
                  <p className="text-neutral-600">
                    Access our collection of templates to help you plan and structure your classes effectively.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Class Plan Template
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Materials List Template
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <BookOpen className="w-8 h-8 text-accent-purple shrink-0" />
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Marketing Resources</h3>
                  <p className="text-neutral-600">
                    Get tips and tools to promote your classes and attract more students.
                  </p>
                  <Button variant="outline" className="mt-4">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Access Marketing Hub
                  </Button>
                </div>
              </div>
            </Card>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;