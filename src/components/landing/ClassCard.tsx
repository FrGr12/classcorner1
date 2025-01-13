import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ClassCardProps {
  title: string;
  instructor: string;
  price: number;
  rating: number;
  images: string[];
  level: string;
  date: Date | Date[];
  city: string;
  category?: string;
}

const validCategories = [
  "Pottery",
  "Cooking",
  "Baking",
  "Painting & Art",
  "Candle Making",
  "Jewellery & Metal Craft",
  "Cocktail & Wine",
  "Photography",
  "Music & Dance",
  "Wood Craft",
  "Textile Craft",
  "Paper Craft",
  "Flower & Plants"
];

const ClassCard = ({
  title,
  instructor,
  price,
  rating,
  level,
  date,
  city,
  category,
}: ClassCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const dates = Array.isArray(date) ? date : [date];
  const visibleDates = dates.slice(0, 2);
  const hasMoreDates = dates.length > 2;

  // Determine the appropriate category based on the class title if none is provided
  const determineCategory = (title: string, providedCategory?: string): string => {
    if (providedCategory && validCategories.includes(providedCategory)) {
      return providedCategory;
    }
    
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes('pottery') || titleLower.includes('ceramic')) return 'Pottery';
    if (titleLower.includes('cook')) return 'Cooking';
    if (titleLower.includes('bake') || titleLower.includes('pastry')) return 'Baking';
    if (titleLower.includes('paint') || titleLower.includes('art')) return 'Painting & Art';
    if (titleLower.includes('cocktail') || titleLower.includes('wine')) return 'Cocktail & Wine';
    if (titleLower.includes('photo')) return 'Photography';
    if (titleLower.includes('music') || titleLower.includes('dance')) return 'Music & Dance';
    if (titleLower.includes('candle')) return 'Candle Making';
    if (titleLower.includes('wood')) return 'Wood Craft';
    if (titleLower.includes('jewel') || titleLower.includes('metal')) return 'Jewellery & Metal Craft';
    if (titleLower.includes('textile') || titleLower.includes('fabric')) return 'Textile Craft';
    if (titleLower.includes('paper')) return 'Paper Craft';
    if (titleLower.includes('flower') || titleLower.includes('plant')) return 'Flower & Plants';
    
    // Default to the most relevant category based on context
    return 'Pottery';
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const displayCategory = determineCategory(title, category);

  return (
    <Card className="overflow-hidden group">
      <div 
        className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-purple-200 to-purple-400"
      >
        <Badge 
          variant="secondary" 
          className="absolute top-3 right-3 bg-white shadow-lg text-primary border-none hover:bg-white/90 cursor-pointer transition-all duration-200 z-10 p-2.5"
          onClick={handleSave}
        >
          <Heart 
            className={`w-5 h-5 ${isSaved ? 'fill-red-500 text-red-500' : 'fill-none text-neutral-600'}`}
          />
        </Badge>
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
          <Badge 
            variant="secondary" 
            className="bg-white/90 text-primary border-none"
          >
            {displayCategory}
          </Badge>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-lg font-medium line-clamp-1">{title}</h3>
        </div>
        <p className="text-sm text-neutral-600 mb-1">by {instructor} · {city}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="text-sm font-medium">{rating}</span>
          </div>
          <p className="font-medium">${price} <span className="text-sm text-neutral-600">/ class</span></p>
        </div>
        <div className="mt-4 flex gap-2 items-center">
          {visibleDates.map((d, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="px-3 py-1 h-auto text-xs text-accent-purple hover:text-accent-purple/80 hover:bg-neutral-100 border border-accent-purple/20 rounded-lg transition-all"
              onClick={() => {
                console.log('Selected date:', d);
              }}
            >
              {format(new Date(d), 'MMM d')}
            </Button>
          ))}
          {hasMoreDates && (
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-3 py-1 h-auto text-xs text-primary font-medium hover:text-primary/80 hover:bg-neutral-100 border border-neutral-200 rounded-lg"
                >
                  +{dates.length - 2}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2">
                <div className="space-y-2">
                  {dates.slice(2).map((d, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-sm text-accent-purple hover:text-accent-purple/80 hover:bg-neutral-100 border border-accent-purple/20 rounded-lg transition-all"
                      onClick={() => {
                        console.log('Selected date:', d);
                        setIsOpen(false);
                      }}
                    >
                      {format(new Date(d), 'MMM d, yyyy')}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ClassCard;