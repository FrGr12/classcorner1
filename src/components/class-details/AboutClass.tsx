
import { ClassItem } from "@/types/class";
import { memo } from "react";

interface AboutClassProps {
  classItem: ClassItem;
}

const AboutClass = memo(({ classItem }: AboutClassProps) => {
  return (
    <section 
      className="glass-panel rounded-xl p-4 sm:p-8"
      aria-labelledby="about-class-heading"
    >
      <h2 
        id="about-class-heading"
        className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-left"
      >
        About This Class
      </h2>
      <div className="prose prose-neutral max-w-none">
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed text-left">
          Join {classItem.instructor} for an immersive {classItem.title.toLowerCase()} experience. 
          This hands-on class is perfect for {classItem.level.toLowerCase()} learners looking to develop their skills
          in a supportive environment.
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
