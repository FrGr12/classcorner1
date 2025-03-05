
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const SearchBar = ({ searchQuery, onSearchChange }: SearchBarProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="max-w-2xl mx-auto mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t("community.searchPlaceholder")}
          className="pl-9 w-full"
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};
