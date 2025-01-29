import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import ImageCarousel from "./class-card/ImageCarousel";
import SaveButton from "./class-card/SaveButton";
import DateButtons from "./class-card/DateButtons";
import CategoryBadges from "./class-card/CategoryBadges";
import ClassDetails from "./class-card/ClassDetails";
import { Badge } from "@/components/ui/badge";

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

const determineCategory = (title: string, category?: string): string => {
  // If a valid category is provided, use it
  if (category && validCategories.includes(category)) {
    return category;
  }

  // Otherwise, try to determine category from title
  const titleLower = title.toLowerCase();
  for (const validCategory of validCategories) {
    if (titleLower.includes(validCategory.toLowerCase())) {
      return validCategory;
    }
  }

  // Default to first category if no match found
  return validCategories[0];
};

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
  const displayCategory = determineCategory(title, category);

  const handleCardClick = () => {
    if (id) {
      navigate(`/class/${displayCategory}/${id}`);
    } else {
      console.warn('No ID provided for class card:', title);
    }
  };

  return (
    <Card 
      className="overflow-hidden group cursor-pointer hover:bg-neutral-50 transition-colors duration-200 rounded-2xl"
      onClick={handleCardClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {rating >= 4.5 && (
          <Badge 
            className="absolute top-3 left-3 z-20 bg-white/90 text-primary px-3 py-1.5 
                     font-medium text-sm rounded-full shadow-sm"
          >
            Guest Favorite
          </Badge>
        )}
        <ImageCarousel images={images} title={title} />
        <SaveButton />
      </div>
      <div className="p-4 space-y-3">
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
      </div>
    </Card>
  );
};

export default ClassCard;
