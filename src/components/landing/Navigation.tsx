import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import IntegratedSearch from "./search/IntegratedSearch";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50">
      <div className="glass-panel rounded-full px-4 py-2.5 flex items-center justify-between shadow-lg backdrop-blur-md">
        <Link to="/" className="flex items-center gap-1 min-w-fit">
          <div className="w-3 h-3 bg-primary rounded-full md:block"></div>
          <span className="text-xs sm:text-base font-semibold hidden md:inline">ClassCorner</span>
        </Link>
        
        <IntegratedSearch />
        
        <div className="hidden md:flex items-center gap-3 min-w-fit">
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
      </div>
    </nav>
  );
};

export default Navigation;