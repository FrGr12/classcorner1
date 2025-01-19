import { useState } from "react";
import { Link } from "react-router-dom";
import IntegratedSearch from "./search/IntegratedSearch";

const Navigation = () => {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50">
      <div className="bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-full px-4 py-2.5 flex flex-col md:flex-row items-center gap-4">
        <Link to="/" className="flex items-center gap-1.5 min-w-fit">
          <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>
          <span className="text-xs sm:text-sm font-medium text-neutral-800 md:inline">ClassCorner</span>
        </Link>
        
        <IntegratedSearch />

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6 ml-auto">
          <Link 
            to="/about" 
            className="text-sm text-neutral-600 hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link 
            to="/teach" 
            className="text-sm text-neutral-600 hover:text-primary transition-colors"
          >
            Start teaching
          </Link>
          <button 
            className="text-sm text-neutral-600 hover:text-primary transition-colors"
          >
            Log in
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;