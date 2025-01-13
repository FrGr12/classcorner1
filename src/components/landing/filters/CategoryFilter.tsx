import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";

interface CategoryFilterProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}

const categories = [
  "Pottery",
  "Cooking",
  "Baking",
  "Painting & Art",
  "Cocktail & Wine",
  "Photography",
  "Music & Dance",
  "Candle Making",
  "Wood Craft",
  "Jewellery & Metal Craft",
  "Textile Craft",
  "Paper Craft",
  "Flower & Plants",
];

const CategoryFilter = ({ selectedCategories, setSelectedCategories }: CategoryFilterProps) => {
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(
      selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category]
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuContent align="start" className="w-[200px] bg-white">
        {categories.map((category) => (
          <DropdownMenuCheckboxItem
            key={category}
            checked={selectedCategories.includes(category)}
            onCheckedChange={() => handleCategoryChange(category)}
            className="cursor-pointer"
          >
            {category}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoryFilter;