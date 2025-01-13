import { useState } from "react";
import { Menu, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";

const categories = [
  { name: "Pottery", icon: "🏺" },
  { name: "Cooking", icon: "👨‍🍳" },
  { name: "Baking", icon: "🥖" },
  { name: "Painting & Art", icon: "🎨" },
  { name: "Cocktail & Wine", icon: "🍷" },
  { name: "Photography", icon: "📸" },
  { name: "Music & Dance", icon: "🎵" },
  { name: "Candle Making", icon: "🕯️" },
  { name: "Wood Craft", icon: "🪚" },
  { name: "Jewellery & Metal Craft", icon: "💍" },
  { name: "Textile Craft", icon: "🧵" },
  { name: "Paper Craft", icon: "📜" },
  { name: "Flower & Plants", icon: "🌸" },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50">
      <div className="glass-panel rounded-full px-4 py-2.5 flex items-center justify-between shadow-lg backdrop-blur-md">
        <Link to="/" className="flex items-center gap-1.5">
          <div className="w-5 h-5 bg-primary rounded-full"></div>
          <span className="text-base font-semibold">ClassCorner</span>
        </Link>
        
        {/* Search Field */}
        <div className="flex items-center flex-1 max-w-3xl mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
            <Input 
              type="text" 
              placeholder="Search for classes..."
              className="pl-9 bg-white border-none w-full h-8 text-xs sm:text-sm placeholder:text-neutral-500"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
            />
            
            {/* Categories Dropdown */}
            {showDropdown && searchValue && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden"
              >
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <Link
                      key={category.name}
                      to={`/browse?category=${category.name}`}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-50 transition-colors"
                      onClick={() => {
                        setShowDropdown(false);
                        setSearchValue("");
                      }}
                    >
                      <span className="text-xl">{category.icon}</span>
                      <span className="text-sm text-neutral-700">{category.name}</span>
                    </Link>
                  ))
                ) : (
                  <div className="px-4 py-2 text-sm text-neutral-500">
                    No categories found
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
        
        {/* Desktop Navigation */}
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

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 hover:bg-neutral-200/50 rounded-full transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="w-5 h-5" />
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
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
              />
              
              {/* Mobile Categories Dropdown */}
              {showDropdown && searchValue && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-50"
                >
                  {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                      <Link
                        key={category.name}
                        to={`/browse?category=${category.name}`}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-50 transition-colors"
                        onClick={() => {
                          setShowDropdown(false);
                          setSearchValue("");
                          setIsMenuOpen(false);
                        }}
                      >
                        <span className="text-xl">{category.icon}</span>
                        <span className="text-sm text-neutral-700">{category.name}</span>
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm text-neutral-500">
                      No categories found
                    </div>
                  )}
                </motion.div>
              )}
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
