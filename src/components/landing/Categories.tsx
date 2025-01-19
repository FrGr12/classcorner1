import { useState } from "react";
import CategoryPills from "./filters/CategoryPills";
import ClassGrid from "./ClassGrid";
import { 
  Amphora, 
  ChefHat, 
  Cookie, 
  Palette, 
  Wine, 
  Camera, 
  Music2, 
  Flame, 
  Axe, 
  Pencil, 
  Scissors, 
  FileText,
  Flower2
} from "lucide-react";

const categories = [
  { name: "Pottery", count: "95+ Classes", icon: Amphora },
  { name: "Cooking", count: "200+ Classes", icon: ChefHat },
  { name: "Baking", count: "85+ Classes", icon: Cookie },
  { name: "Painting & Art", count: "120+ Classes", icon: Palette },
  { name: "Candle Making", count: "45+ Classes", icon: Flame },
  { name: "Jewellery & Metal", count: "90+ Classes", icon: Pencil },
  { name: "Cocktail & Wine", count: "60+ Classes", icon: Wine },
  { name: "Photography", count: "80+ Classes", icon: Camera },
  { name: "Music & Dance", count: "150+ Classes", icon: Music2 },
  { name: "Wood Craft", count: "75+ Classes", icon: Axe },
  { name: "Textile Craft", count: "110+ Classes", icon: Scissors },
  { name: "Paper Craft", count: "40+ Classes", icon: FileText },
  { name: "Flower & Plants", count: "70+ Classes", icon: Flower2 },
];

const Categories = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  return (
    <section className="pt-24 sm:pt-28 bg-neutral-100">
      <div className="container-padding">
        <div className="mt-8 text-neutral-600">
          <CategoryPills
            categories={categories}
            selectedCategories={selectedCategories}
            onCategorySelect={handleCategorySelect}
          />
        </div>

        <div className="mt-12">
          <ClassGrid category={selectedCategories.length === 1 ? selectedCategories[0] : null} />
        </div>
      </div>
    </section>
  );
};

export default Categories;