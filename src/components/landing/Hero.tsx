import { motion } from "framer-motion";
import { Search, Users } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Hero = () => {
  return (
    <header className="container-padding py-12">
      <div className="max-w-4xl mx-auto text-center relative z-10 pt-32 pb-24">
        <motion.h1 
          className="heading-xl mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          It's time to create
        </motion.h1>
        <motion.p 
          className="text-2xl text-neutral-600 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          4,000+ creative classes and experiences
        </motion.p>
        
        <motion.div 
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="glass-panel p-4 rounded-xl flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex items-center gap-2 bg-white rounded-lg px-4 py-2">
              <Search className="w-5 h-5 text-neutral-400" />
              <Select>
                <SelectTrigger className="border-0 p-0 h-auto">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ny">New York City</SelectItem>
                  <SelectItem value="sf">San Francisco</SelectItem>
                  <SelectItem value="la">Los Angeles</SelectItem>
                  <SelectItem value="ch">Chicago</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2">
              <Users className="w-5 h-5 text-neutral-400" />
              <Select>
                <SelectTrigger className="border-0 p-0 h-auto w-24">
                  <SelectValue placeholder="1 person" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 person</SelectItem>
                  <SelectItem value="2">2 people</SelectItem>
                  <SelectItem value="3">3 people</SelectItem>
                  <SelectItem value="4">4+ people</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <button className="button-primary whitespace-nowrap">
              See classes
            </button>
          </div>
          
          <div className="mt-6 text-center">
            <span className="text-neutral-500">or</span>
            <button className="button-secondary ml-4">
              Get a gift card
            </button>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Hero;