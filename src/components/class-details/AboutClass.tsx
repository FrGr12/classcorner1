
import { ClassItem } from "@/types/class";
import { memo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AboutClassProps {
  classItem: ClassItem;
}

const AboutClass = memo(({ classItem }: AboutClassProps) => {
  const { t } = useLanguage();
  
  return (
    <section 
      className="glass-panel rounded-xl p-4 sm:p-8"
      aria-labelledby="about-class-heading"
    >
      <h2 
        id="about-class-heading"
        className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-left"
      >
        {t('class.aboutTitle')}
      </h2>
      <div className="prose prose-neutral max-w-none">
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed text-left">
          {t('class.aboutIntro', { instructor: classItem.instructor, title: classItem.title.toLowerCase(), level: classItem.level.toLowerCase() })}
        </p>
        
        {classItem.description && (
          <div 
            className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed"
            aria-label="Class description"
          >
            {classItem.description}
          </div>
        )}
      </div>
    </section>
  );
});

AboutClass.displayName = 'AboutClass';

export default AboutClass;
