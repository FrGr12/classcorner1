
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

  const makeUrlSafe = (str: string): string => {
    // First, handle special category names
    const specialCategories: Record<string, string> = {
      "Painting & Art": "painting-art",
      "Jewellery & Metal": "jewellery-metal",
      "Cocktail & Wine": "cocktail-wine",
      "Music & Dance": "music-dance",
      "Flower & Plants": "flower-plants"
    };

    if (specialCategories[str]) {
      return specialCategories[str];
    }

    // For other categories, apply general URL-safe transformation
    return str
      .toLowerCase()
      .replace(/[&\s]+/g, '-') // Replace & and spaces with single hyphen
      .replace(/[^a-z0-9-]/g, '') // Remove any other special characters
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  };

  const handleCardClick = () => {
    if (!id) {
      console.warn('No ID provided for class card:', title);
      return;
    }

    try {
      const displayCategory = determineCategory(title, category);
      const safeCategoryPath = makeUrlSafe(displayCategory);
      
      if (!safeCategoryPath) {
        throw new Error(`Invalid category path for: ${displayCategory}`);
      }

      navigate(`/class/${safeCategoryPath}/${id}`);
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback to browse page if there's an error
      navigate('/browse', { 
        state: { error: "Could not load class details. Please try again." }
      });
    }
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
