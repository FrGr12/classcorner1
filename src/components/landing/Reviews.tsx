
import { Star } from "lucide-react";

const Reviews = () => {
  return (
    <section className="py-8 md:py-12 border-y border-neutral-200">
      <div className="container-padding">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 md:w-5 md:h-5 fill-accent-purple text-accent-purple" />
            </div>
            <span className="text-base md:text-lg font-semibold">4.9</span>
            <span className="text-sm md:text-base text-neutral-600">(8,700+ reviews)</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {['US News', 'The Guardian', 'Time Out'].map((press) => (
              <div 
                key={press}
                className="h-6 md:h-8 w-20 md:w-24 bg-neutral-200 rounded"
                aria-label={`${press} logo`}
              />
            ))}
          </div>
          
          <div className="flex items-center gap-2 md:gap-3">
            <span className="text-sm md:text-base text-neutral-600">Supporting</span>
            <div 
              className="h-6 md:h-8 w-20 md:w-24 bg-neutral-200 rounded"
              aria-label="NAMI logo"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
