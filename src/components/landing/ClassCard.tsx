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
    for (const category of validCategories) {
      const categoryLower = category.toLowerCase();
      if (titleLower.includes(categoryLower.split(' ')[0])) {
        return category;
      }
    }
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