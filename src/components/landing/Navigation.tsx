import { useState } from "react";
import { Menu, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50">
      <div className="glass-panel rounded-full px-6 py-4 flex items-center justify-between shadow-lg backdrop-blur-md">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full"></div>
          <span className="text-xl font-semibold">ClassCorner</span>
        </Link>
        
        {/* Search Field */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <Input 
              type="text" 
              placeholder="Search for classes..." 
              className="pl-10 bg-neutral-100 border-none"
            />
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            to="/about" 
            className={`font-medium ${location.pathname === '/about' ? 'text-primary' : 'text-neutral-600 hover:text-primary'} transition-colors`}
          >
            About
          </Link>
          <button className="px-4 py-2 text-primary hover:text-primary/80 transition-colors font-medium">
            Log in
          </button>
          <Link to="/teach" className="button-secondary">
            Start Teaching
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 hover:bg-neutral-200/50 rounded-full transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden glass-panel mt-2 rounded-xl p-4 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col gap-4">
            {/* Mobile Search */}
            <div className="relative w-full mb-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <Input 
                type="text" 
                placeholder="Search for classes..." 
                className="pl-10 bg-neutral-100 border-none w-full"
              />
            </div>
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