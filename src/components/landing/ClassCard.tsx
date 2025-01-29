import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import ImageCarousel from "./class-card/ImageCarousel";
import SaveButton from "./class-card/SaveButton";
import DateButtons from "./class-card/DateButtons";
import CategoryBadges from "./class-card/CategoryBadges";
import ClassDetails from "./class-card/ClassDetails";

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
  groupBookingsEnabled?: boolean;
  privateBookingsEnabled?: boolean;
  basePriceGroup?: number;
  basePricePrivate?: number;
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
  groupBookingsEnabled,
  privateBookingsEnabled,
  basePriceGroup,
  basePricePrivate,
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
      className="overflow-hidden group cursor-pointer hover:shadow-md transition-all duration-200"
      onClick={handleCardClick}
    >
      <div className="relative">
        <ImageCarousel images={images} title={title} />
        <SaveButton />
        <CategoryBadges 
          displayCategory={displayCategory}
        />
      </div>
      <ClassDetails 
        title={title}
        instructor={instructor}
        city={city}
        rating={rating}
        price={price}
        groupBookingsEnabled={groupBookingsEnabled}
        privateBookingsEnabled={privateBookingsEnabled}
        basePriceGroup={basePriceGroup}
        basePricePrivate={basePricePrivate}
      />
      <DateButtons 
        dates={dates} 
        price={price} 
        classId={id}
        category={displayCategory}
      />
    </Card>
  );
};

export default ClassCard;
