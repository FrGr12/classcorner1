
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <header className="relative container-padding py-10 sm:py-12 md:py-6 lg:py-8 mt-32 sm:mt-28 md:mt-24 lg:mt-20">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-accent-purple/10 to-transparent rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h1 
          className="text-3xl sm:text-5xl md:text-6xl font-display mb-3 sm:mb-4 leading-tight tracking-tight text-accent-purple"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t('hero.title')}
        </motion.h1>

        <motion.p 
          className="text-base sm:text-xl text-neutral-600 max-w-2xl mx-auto px-4 leading-relaxed mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button 
            size="lg"
            className="bg-accent-purple hover:bg-accent-purple/90 text-white px-8 w-[200px]"
            onClick={() => navigate('/browse')}
          >
            {t('hero.browseClasses')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-accent-purple text-accent-purple hover:bg-accent-purple/10 w-[200px]"
            onClick={() => navigate('/auth', { state: { returnTo: '/dashboard/create-class' } })}
          >
            {t('hero.becomeInstructor')}
          </Button>
        </motion.div>
        
        <motion.div 
          className="mt-4 sm:mt-8 flex items-center justify-center gap-2 sm:gap-6 text-xs sm:text-sm text-neutral-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="font-medium text-neutral-900">10,000+</span>
            <span>{t('hero.students')}</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-neutral-300" />
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="font-medium text-neutral-900">1,000+</span>
            <span>{t('hero.instructors')}</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-neutral-300" />
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="font-medium text-neutral-900">50+</span>
            <span>{t('hero.categories')}</span>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Hero;
