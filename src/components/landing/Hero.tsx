import { motion } from "framer-motion";

const Hero = () => {
  return (
    <header className="relative container-padding py-4 md:py-8">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h1 
          className="heading-xl mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Discover and Book Amazing Classes
        </motion.h1>
        <motion.p
          className="text-lg text-neutral-600 max-w-2xl mx-auto"
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