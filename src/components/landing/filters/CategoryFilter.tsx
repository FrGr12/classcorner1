
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { categories } from "../search/constants";

interface CategoryFilterProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}

const CategoryFilter = ({ selectedCategories, setSelectedCategories }: CategoryFilterProps) => {
  const { t } = useLanguage();
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(
      selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories.filter((l) => l !== "Everywhere"), category]
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
            ? t("search.all")
            : `${selectedCategories.length}`}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px] bg-white">
        {categories.map((category) => {
          // Convert category name to translation key format
          const translationKey = `categories.${category.toLowerCase().replace(/\s+&\s+/g, '_').replace(/\s+/g, '_')}`;
          
          return (
            <DropdownMenuCheckboxItem
              key={category}
              checked={selectedCategories.includes(category)}
              onCheckedChange={() => handleCategoryChange(category)}
              className="cursor-pointer"
            >
              {t(translationKey)}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoryFilter;
