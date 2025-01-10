import { useState } from "react";
import FilterButtons from "./filters/FilterButtons";
import LocationSearch from "./filters/LocationSearch";
import CategoryPills from "./filters/CategoryPills";
import ClassGrid from "./ClassGrid";
import PopularCities from "./cities/PopularCities";

const categories = [
  { name: "Pottery", count: "95+ Classes", icon: "🏺" },
  { name: "Cooking", count: "200+ Classes", icon: "👨‍🍳" },
  { name: "Baking", count: "85+ Classes", icon: "🥖" },
  { name: "Painting & Art", count: "120+ Classes", icon: "🎨" },
  { name: "Cocktail & Wine", count: "60+ Classes", icon: "🍷" },
  { name: "Photography", count: "80+ Classes", icon: "📸" },
  { name: "Music & Dance", count: "150+ Classes", icon: "🎵" },
  { name: "Candle Making", count: "45+ Classes", icon: "🕯️" },
  { name: "Wood Craft", count: "75+ Classes", icon: "🪚" },
  { name: "Jewellery & Metal Craft", count: "90+ Classes", icon: "💍" },
  { name: "Textile Craft", count: "110+ Classes", icon: "🧵" },
  { name: "Paper Craft", count: "40+ Classes", icon: "📜" },
  { name: "Flower & Plants", count: "70+ Classes", icon: "🌸" },
];

const cities = [
  { name: "New York", count: "250+ Classes" },
  { name: "Los Angeles", count: "180+ Classes" },
  { name: "Chicago", count: "150+ Classes" },
  { name: "San Francisco", count: "120+ Classes" },
  { name: "Austin", count: "90+ Classes" },
  { name: "Seattle", count: "85+ Classes" },
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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>("Everywhere");
  const [selectedTime, setSelectedTime] = useState<string>("Any week");
  const [open, setOpen] = useState(false);

  return (
    <section className="py-12 bg-neutral-100">
      <div className="container-padding">
        <FilterButtons
          selectedCategory={selectedCategory}
          selectedLocation={selectedLocation}
          selectedTime={selectedTime}
          setSelectedCategory={setSelectedCategory}
          setOpen={setOpen}
          setSelectedLocation={setSelectedLocation}
        />

        <LocationSearch
          open={open}
          onOpenChange={setOpen}
          setSelectedLocation={setSelectedLocation}
          cities={swedishCities}
        />

        <CategoryPills
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <div className="mt-12">
          <ClassGrid category={selectedCategory} />
        </div>

        <PopularCities cities={cities} />
      </div>
    </section>
  );
};

export default Categories;