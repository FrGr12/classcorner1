import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto space-y-12">
          <section>
            <h1 className="text-4xl font-display font-semibold mb-6">About ClassCorner</h1>
            <p className="text-lg text-neutral-600 leading-relaxed">
              ClassCorner is a platform that connects passionate instructors with eager learners, 
              making it easy to discover and book hands-on creative classes in your area.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-neutral-600">
                We believe in the power of hands-on learning and creative expression. 
                Our mission is to make creative education accessible to everyone by 
                connecting skilled artisans and instructors with students eager to learn.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
              <p className="text-neutral-600">
                We envision a world where everyone has the opportunity to explore their 
                creativity, learn new skills, and connect with passionate instructors in 
                their community.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">For Students</h3>
                <ul className="space-y-2 text-neutral-600">
                  <li>• Discover unique creative classes</li>
                  <li>• Learn from experienced instructors</li>
                  <li>• Book classes easily</li>
                  <li>• Join a creative community</li>
                </ul>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">For Teachers</h3>
                <ul className="space-y-2 text-neutral-600">
                  <li>• Share your expertise</li>
                  <li>• Manage your classes</li>
                  <li>• Build your student base</li>
                  <li>• Earn teaching</li>
                </ul>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Our Categories</h3>
                <ul className="space-y-2 text-neutral-600">
                  <li>• Arts & Crafts</li>
                  <li>• Cooking & Baking</li>
                  <li>• Photography</li>
                  <li>• And many more!</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;