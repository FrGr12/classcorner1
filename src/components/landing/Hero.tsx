
import { motion } from "framer-motion";
import { Search, MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <header className="relative container-padding py-8 md:py-16 lg:py-24">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl font-display mb-6 leading-tight tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Learn Something New Today
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto mb-8 px-4 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Discover unique local classes and unlock your creativity with experienced instructors
        </motion.p>

        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button
            onClick={() => navigate("/browse")}
            className="w-full md:w-auto flex items-center gap-3 px-6 py-4 bg-white rounded-full border border-neutral-200 shadow-lg hover:shadow-xl transition-all text-left group mx-auto"
          >
            <div className="flex items-center gap-6 mx-auto">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-accent-purple" />
                <span className="text-sm font-medium">Find a class</span>
              </div>
              <div className="h-4 w-px bg-neutral-200" />
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent-purple" />
                <span className="text-sm text-neutral-600">Anywhere</span>
              </div>
              <div className="h-4 w-px bg-neutral-200" />
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent-purple" />
                <span className="text-sm text-neutral-600">Any week</span>
              </div>
            </div>
          </button>
        </motion.div>
      </div>
    </header>
  );
};

export default Hero;
