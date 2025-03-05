
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs hover:text-accent-purple flex items-center"
          aria-label="Change language"
        >
          <Globe className="h-3.5 w-3.5 mr-1.5" />
          <span className="uppercase">{language}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white/95 backdrop-blur-sm">
        <DropdownMenuItem 
          onClick={() => setLanguage("en")} 
          className={language === "en" ? "font-medium text-accent-purple" : ""}
        >
          {t("language.english")}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage("sv")} 
          className={language === "sv" ? "font-medium text-accent-purple" : ""}
        >
          {t("language.swedish")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
