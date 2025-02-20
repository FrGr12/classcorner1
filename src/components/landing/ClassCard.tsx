
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
  maxParticipants?: number;
}

const validCategories = [
  "Pottery", "Cooking", "Baking", "Painting & Art", "Candle Making",
  "Jewellery & Metal", "Cocktail & Wine", "Photography", "Music & Dance",
  "Wood Craft", "Textile Craft", "Paper Craft", "Flower & Plants"
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
  maxParticipants,
}: ClassCardProps) => {
  const navigate = useNavigate();
  const dates = Array.isArray(date) ? date : [date];

  const determineCategory = (title: string, providedCategory?: string): string => {
    if (providedCategory && validCategories.includes(providedCategory)) {
      return providedCategory;
    }
    
    const titleLower = title.toLowerCase();
    for (const cat of validCategories) {
      const categoryLower = cat.toLowerCase();
      if (titleLower.includes(categoryLower.split(' ')[0])) {
        return cat;
      }
    }
    return 'Pottery';
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!id) {
      console.warn('No ID provided for class card:', title);
      return;
    }

    const displayCategory = determineCategory(title, category);
    // Simplify category to match the mockClasses structure
    const categoryKey = displayCategory.split(' ')[0];
    navigate(`/class/${categoryKey.toLowerCase()}/${id}`);
  };

  const displayCategory = determineCategory(title, category);

  return (
    <Card 
      className="overflow-hidden group cursor-pointer hover:shadow-md transition-all duration-200 border-0 bg-white"
      onClick={handleCardClick}
    >
      <div className="relative aspect-[4/3]">
        <ImageCarousel images={images} title={title} />
        <SaveButton />
        <CategoryBadges displayCategory={displayCategory} />
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
        maxParticipants={maxParticipants}
      />
    </Card>
  );
};

export default ClassCard;
