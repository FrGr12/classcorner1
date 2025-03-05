
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CategoryFilterProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}

const CategoryFilter = ({ selectedCategories, setSelectedCategories }: CategoryFilterProps) => {
  const { t } = useLanguage();
  
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
    "Jewellery & Metal",
    "Textile Craft",
    "Paper Craft",
    "Flower & Plants",
  ];

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(
      selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category]
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="h-11 px-5 text-sm rounded-l-lg rounded-r-none border-r-0"
        >
          <Filter className="w-4 h-4 mr-2" />
          {selectedCategories.length === 0
            ? t('filters.allCategories')
            : `${selectedCategories.length}`}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px] bg-white">
        {categories.map((category) => (
          <DropdownMenuCheckboxItem
            key={category}
            checked={selectedCategories.includes(category)}
            onCheckedChange={() => handleCategoryChange(category)}
            className="cursor-pointer"
          >
            {t(`categories.${category.toLowerCase().replace(/\s+&\s+/g, '_').replace(/\s+/g, '_')}`)}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoryFilter;
