import { motion } from "framer-motion";

const Hero = () => {
  return (
    <header className="container-padding py-12">
      {/* Hero content */}
      <div className="max-w-4xl mx-auto text-center relative z-10 pt-40 pb-32">
        <motion.h1 
          className="heading-xl mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Share Your Craft, Find Your Next Class
        </motion.h1>
        <motion.p 
          className="text-xl text-neutral-600 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Connect with local artisans and craft enthusiasts. Book classes in ceramics, painting, cooking, and more.
        </motion.p>
        <motion.div 
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button className="button-primary flex items-center gap-2">
            Start Teaching
          </button>
          <button className="px-6 py-3 border border-neutral-300 rounded-lg hover:bg-neutral-200/50 transition-colors">
            Browse Classes
          </button>
        </motion.div>
      </div>
    </header>
  );
};

export default Hero;