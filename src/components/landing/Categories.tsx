import { useState } from "react";
import FilterButtons from "./filters/FilterButtons";
import LocationSearch from "./filters/LocationSearch";
import CategoryPills from "./filters/CategoryPills";
import ClassGrid from "./ClassGrid";
import { 
  Paintbrush, 
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
  { name: "Pottery", count: "95+ Classes", icon: Paintbrush },
  { name: "Cooking", count: "200+ Classes", icon: ChefHat },
  { name: "Baking", count: "85+ Classes", icon: Cookie },
  { name: "Painting & Art", count: "120+ Classes", icon: Palette },
  { name: "Cocktail & Wine", count: "60+ Classes", icon: Wine },
  { name: "Photography", count: "80+ Classes", icon: Camera },
  { name: "Music & Dance", count: "150+ Classes", icon: Music2 },
  { name: "Candle Making", count: "45+ Classes", icon: Flame },
  { name: "Wood Craft", count: "75+ Classes", icon: Axe },
  { name: "Jewellery & Metal Craft", count: "90+ Classes", icon: Pencil },
  { name: "Textile Craft", count: "110+ Classes", icon: Scissors },
  { name: "Paper Craft", count: "40+ Classes", icon: FileText },
  { name: "Flower & Plants", count: "70+ Classes", icon: Flower2 },
];

const swedishCities = [
  "Stockholm",
  "Göteborg",
  "Malmö",
  "Uppsala",
  "Västerås",
  "Örebro",
  "Linköping",
  "Helsingborg",
  "Jönköping",
  "Norrköping",
];

const Categories = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>(["Everywhere"]);
  const [selectedTime, setSelectedTime] = useState<string>("Any week");
  const [open, setOpen] = useState(false);

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
    <section className="pt-6 sm:pt-8 bg-neutral-100">
      <div className="container-padding">
        <FilterButtons
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedLocations={selectedLocations}
          selectedTime={selectedTime}
          setOpen={setOpen}
          setSelectedLocations={setSelectedLocations}
        />

        <LocationSearch
          open={open}
          onOpenChange={setOpen}
          setSelectedLocations={setSelectedLocations}
          cities={swedishCities}
        />

        <CategoryPills
          categories={categories}
          selectedCategories={selectedCategories}
          onCategorySelect={handleCategorySelect}
        />

        <div className="mt-12">
          <ClassGrid category={selectedCategories.length === 1 ? selectedCategories[0] : null} />
        </div>
      </div>
    </section>
  );
};

export default Categories;
