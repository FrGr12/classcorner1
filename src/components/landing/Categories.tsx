import { useState } from "react";
import FilterButtons from "./filters/FilterButtons";
import LocationSearch from "./filters/LocationSearch";
import CategoryPills from "./filters/CategoryPills";
import ClassGrid from "./ClassGrid";

const categories = [
  { name: "Pottery", count: "95+ Classes", icon: "🎨" },
  { name: "Cooking", count: "200+ Classes", icon: "👨‍🍳" },
  { name: "Baking", count: "85+ Classes", icon: "🥐" },
  { name: "Painting & Art", count: "120+ Classes", icon: "🖼️" },
  { name: "Cocktail & Wine", count: "60+ Classes", icon: "🍸" },
  { name: "Photography", count: "80+ Classes", icon: "📸" },
  { name: "Music & Dance", count: "150+ Classes", icon: "💃" },
  { name: "Candle Making", count: "45+ Classes", icon: "✨" },
  { name: "Wood Craft", count: "75+ Classes", icon: "🪚" },
  { name: "Jewellery & Metal Craft", count: "90+ Classes", icon: "💎" },
  { name: "Textile Craft", count: "110+ Classes", icon: "🧵" },
  { name: "Paper Craft", count: "40+ Classes", icon: "🎨" },
  { name: "Flower & Plants", count: "70+ Classes", icon: "🌺" },
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