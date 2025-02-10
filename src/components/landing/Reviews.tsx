
import { Star } from "lucide-react";

const Reviews = () => {
  return (
    <section className="py-6 sm:py-8 md:py-12 border-y border-neutral-200 bg-white/50">
      <div className="container-padding">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-12">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Star className="w-5 h-5 fill-secondary text-secondary" />
            </div>
            <span className="text-lg font-semibold">4.9</span>
            <span className="text-base text-neutral-600">(8,700+ reviews)</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {['US News', 'The Guardian', 'Time Out'].map((press) => (
              <div 
                key={press}
                className="h-8 w-24 bg-neutral-200/50 rounded-lg transition-colors hover:bg-neutral-200"
                aria-label={`${press} logo`}
              />
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-base text-neutral-600">Supporting</span>
            <div 
              className="h-8 w-24 bg-neutral-200/50 rounded-lg transition-colors hover:bg-neutral-200"
              aria-label="NAMI logo"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
