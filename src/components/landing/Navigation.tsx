import { useState } from "react";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import IntegratedSearch from "./search/IntegratedSearch";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50">
      <div className="glass-panel rounded-full px-4 py-2.5 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-1 min-w-fit">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <span className="text-xs sm:text-base font-semibold">ClassCorner</span>
        </Link>
        
        <IntegratedSearch />
        
        <div className="hidden md:flex items-center gap-3">
          <Link 
            to="/about" 
            className={`text-sm font-medium ${location.pathname === '/about' ? 'text-primary' : 'text-neutral-600 hover:text-primary'} transition-colors`}
          >
            About
          </Link>
          <button className="px-3 py-1.5 text-sm text-primary hover:text-primary/80 transition-colors font-medium">
            Log in
          </button>
          <Link to="/teach" className="button-secondary text-sm px-4 py-1.5">
            Start Teaching
          </Link>
        </div>

        <button 
          className="md:hidden p-2 hover:bg-neutral-200/50 rounded-full transition-colors ml-auto"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {isMenuOpen && (
        <motion.div 
          className="md:hidden glass-panel mt-2 rounded-xl p-4 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col gap-4">
            <Link 
              to="/about" 
              className="text-neutral-600 hover:text-primary transition-colors font-medium px-4 py-2 hover:bg-neutral-200/50 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <hr className="border-neutral-200" />
            <button className="text-primary hover:text-primary/80 transition-colors font-medium px-4 py-2 hover:bg-neutral-200/50 rounded-lg text-left">
              Log in
            </button>
            <Link 
              to="/teach" 
              className="button-secondary w-full text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Start Teaching
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navigation;