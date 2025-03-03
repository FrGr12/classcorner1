
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Features = () => {
  const navigate = useNavigate();
  
  const features = [{
    title: "Discover Local Classes",
    description: "Find and book hands-on classes in your area. Learn from experienced craftspeople and join a community of creative learners.",
    points: ["Browse by Category", "Read Reviews", "Secure Booking"],
    image: "https://images.unsplash.com/photo-1596496181871-9681eacf9764?q=80&w=800&auto=format&fit=crop"
  }, {
    title: "Share Your Expertise",
    description: "Whether you're a professional ceramist or a passionate home cook, create and manage your craft classes with our easy-to-use platform.",
    points: ["Simple Class Creation", "Flexible Scheduling", "Student Management"],
    image: "https://images.unsplash.com/photo-1594535182308-8ffefbb661e1?q=80&w=800&auto=format&fit=crop"
  }];

  const handleTeachClick = () => {
    navigate('/auth', { state: { returnTo: '/dashboard/create-class' } });
  };

  return (
    <section className="py-24">
      <div className="container-padding">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-accent-purple/10 text-accent-purple px-4 py-1.5 rounded-full text-sm font-medium">
            HOW IT WORKS
          </span>
          <h2 className="heading-lg mt-6 font-display font-normal">Connect, Create, and Learn</h2>
          <p className="text-neutral-600 mt-4 max-w-2xl mx-auto">
            ClassCorner brings together craft enthusiasts and skilled artisans in your local community.
          </p>
        </motion.div>

        {features.map((feature, index) => (
          <motion.div 
            key={feature.title} 
            className={`flex flex-col md:flex-row gap-12 items-center mb-24 ${
              index % 2 === 1 ? 'md:flex-row-reverse' : ''
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex-1">
              <h3 className="text-2xl font-display font-normal mb-4">{feature.title}</h3>
              <p className="text-neutral-600 mb-6">{feature.description}</p>
              <ul className="space-y-4">
                {feature.points.map(point => (
                  <motion.li 
                    key={point} 
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <div className="w-5 h-5 rounded-full bg-accent-purple/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-accent-purple" />
                    </div>
                    {point}
                  </motion.li>
                ))}
              </ul>
              <div className="mt-8 flex gap-4">
                <button 
                  onClick={() => index === 0 ? navigate('/browse') : handleTeachClick()} 
                  className="button-primary"
                >
                  {index === 0 ? "Find your next class" : "Start Teaching"}
                </button>
                <button 
                  onClick={() => navigate('/community/resource/beginner-guides')}
                  className="px-6 py-3 text-neutral-600 hover:text-accent-purple transition-colors"
                >
                  Learn More
                </button>
              </div>
            </div>
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="glass-panel p-6 rounded-2xl overflow-hidden">
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  className="w-full h-auto rounded-lg object-cover aspect-video"
                  loading="lazy"
                />
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
