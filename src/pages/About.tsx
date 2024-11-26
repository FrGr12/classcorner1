import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { Card } from "@/components/ui/card";

const About = () => {
  const team = [
    { name: "Sarah Johnson", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c" },
    { name: "Mike Chen", role: "Community Lead", image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81" },
    { name: "Emma Davis", role: "Head of Operations", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04" },
  ];

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <main className="pt-32 pb-16 container-padding">
        <div className="max-w-4xl mx-auto">
          <h1 className="heading-lg mb-8">About ClassCorner</h1>
          
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-neutral-600 mb-4">
              ClassCorner connects creative individuals with local craft classes, fostering a community
              of hands-on learning and artistic expression. We believe in the power of in-person
              instruction and the joy of creating something with your own hands.
            </p>
            <p className="text-neutral-600">
              Our platform makes it easy for skilled artisans to share their craft with eager students,
              while helping students discover and book classes in their area.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-8">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member) => (
                <Card key={member.name} className="overflow-hidden">
                  <div className="aspect-square">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-neutral-600">{member.role}</p>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;