
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <header className="relative container-padding py-4 md:py-8">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h1 
          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Discover and Book Amazing Classes
        </motion.h1>
        <motion.p
          className="text-base md:text-lg text-neutral-600 max-w-2xl mx-auto px-4 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Find the perfect class to learn something new, meet amazing people, and unlock your creativity.
        </motion.p>
      </div>
    </header>
  );
};

export default Hero;
