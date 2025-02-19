
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Features = () => {
  const navigate = useNavigate();
  
  const features = [{
    title: "Discover Local Classes",
    description: "Find and book hands-on classes in your area. Learn from experienced craftspeople and join a community of creative learners.",
    points: ["Browse by Category", "Read Reviews", "Secure Booking"]
  }, {
    title: "Share Your Expertise",
    description: "Whether you're a professional ceramist or a passionate home cook, create and manage your craft classes with our easy-to-use platform.",
    points: ["Simple Class Creation", "Flexible Scheduling", "Student Management"]
  }];

  const handleTeachClick = () => {
    navigate('/dashboard/create-class');
  };

  return <section className="py-24">
      <div className="container-padding">
        <div className="text-center mb-16">
          <span className="bg-accent-purple/10 text-accent-purple px-4 py-1.5 rounded-full text-sm font-medium">
            HOW IT WORKS
          </span>
          <h2 className="heading-lg mt-6">Connect, Create, and Learn</h2>
          <p className="text-neutral-600 mt-4 max-w-2xl mx-auto">
            ClassCorner brings together craft enthusiasts and skilled artisans in your local community.
          </p>
        </div>

        {features.map((feature, index) => <div key={feature.title} className={`flex flex-col md:flex-row gap-12 items-center mb-24 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-neutral-600 mb-6">{feature.description}</p>
              <ul className="space-y-4">
                {feature.points.map(point => <li key={point} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent-purple/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-accent-purple" />
                    </div>
                    {point}
                  </li>)}
              </ul>
              <div className="mt-8 flex gap-4">
                <button 
                  onClick={() => index === 0 ? navigate('/browse') : handleTeachClick()} 
                  className="button-primary"
                >
                  {index === 0 ? "Find your next class" : "Start Teaching"}
                </button>
                <button 
                  onClick={() => navigate('/community')}
                  className="px-6 py-3 text-neutral-600 hover:text-primary transition-colors"
                >
                  Learn More
                </button>
              </div>
            </div>
            <div className="flex-1">
              <Card className="glass-panel p-6 rounded-2xl">
                <img src="/placeholder.svg" alt={feature.title} className="w-full h-auto rounded-lg" />
              </Card>
            </div>
          </div>)}
      </div>
    </section>;
};

export default Features;
