
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <header className="relative container-padding py-6 md:py-12 lg:py-16">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl font-display mb-8 leading-tight tracking-tight bg-gradient-to-r from-[#F97316] via-[#D946EF] to-[#8B5CF6] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Discover and Book Amazing Classes
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto px-4 leading-relaxed mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Find the perfect class to learn something new, meet amazing people, and unlock your creativity.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link 
            to="/browse"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#F97316] to-[#D946EF] text-white rounded-full hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl"
          >
            <Search className="w-5 h-5" />
            <span className="font-medium">Explore Classes</span>
          </Link>
        </motion.div>
      </div>
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#FEF7CD]/30 to-transparent -z-10"
        aria-hidden="true"
      />
    </header>
  );
};

export default Hero;
