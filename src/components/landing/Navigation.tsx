import { useState } from "react";
import { Link } from "react-router-dom";
import IntegratedSearch from "./search/IntegratedSearch";

const Navigation = () => {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50">
      <div className="glass-panel rounded-full px-4 py-2.5 flex flex-col md:flex-row items-center gap-4">
        <Link to="/" className="flex items-center gap-1 min-w-fit">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <span className="text-xs sm:text-base font-semibold md:inline">ClassCorner</span>
        </Link>
        
        <IntegratedSearch />
      </div>
    </nav>
  );
};

export default Navigation;