
import { Star } from "lucide-react";

const Reviews = () => {
  return (
    <section className="py-8 sm:py-10 md:py-12 border-y border-neutral-200 bg-gradient-to-b from-white to-[#F1F0FB]">
      <div className="container-padding">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-12">
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
            <div className="flex items-center">
              <Star className="w-5 h-5 fill-[#F97316] text-[#F97316]" />
            </div>
            <span className="text-lg font-semibold bg-gradient-to-r from-[#F97316] to-[#D946EF] bg-clip-text text-transparent">4.9</span>
            <span className="text-base text-neutral-600">(8,700+ reviews)</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {['US News', 'The Guardian', 'Time Out'].map((press) => (
              <div 
                key={press}
                className="h-8 w-24 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-all"
                aria-label={`${press} logo`}
              />
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-base text-neutral-600">Supporting</span>
            <div 
              className="h-8 w-24 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-all"
              aria-label="NAMI logo"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
