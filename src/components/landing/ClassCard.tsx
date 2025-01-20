import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import ImageCarousel from "./class-card/ImageCarousel";
import SaveButton from "./class-card/SaveButton";
import CategoryBadge from "./class-card/CategoryBadge";
import DateButtons from "./class-card/DateButtons";

interface ClassCardProps {
  id?: number;
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
  "Jewellery & Metal",
  "Cocktail & Wine",
  "Photography",
  "Music & Dance",
  "Wood Craft",
  "Textile Craft",
  "Paper Craft",
  "Flower & Plants"
];

const ClassCard = ({
  id,
  title,
  instructor,
  price,
  rating,
  images,
  level,
  date,
  city,
  category,
}: ClassCardProps) => {
  const navigate = useNavigate();
  const dates = Array.isArray(date) ? date : [date];

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
    if (titleLower.includes('jewel') || titleLower.includes('metal')) return 'Jewellery & Metal';
    if (titleLower.includes('textile') || titleLower.includes('fabric')) return 'Textile Craft';
    if (titleLower.includes('paper')) return 'Paper Craft';
    if (titleLower.includes('flower') || titleLower.includes('plant')) return 'Flower & Plants';
    
    return 'Pottery';
  };

  const handleCardClick = () => {
    if (id) {
      const displayCategory = determineCategory(title, category);
      navigate(`/class/${displayCategory}/${id}`);
    } else {
      console.warn('No ID provided for class card:', title);
    }
  };

  const displayCategory = determineCategory(title, category);

  return (
    <Card 
      className="overflow-hidden group cursor-pointer hover:bg-neutral-50 transition-colors duration-200"
      onClick={handleCardClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <ImageCarousel images={images} title={title} />
        <SaveButton />
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
          <CategoryBadge category={displayCategory} />
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
        <DateButtons dates={dates} />
      </div>
    </Card>
  );
};

export default ClassCard;