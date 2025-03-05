
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CommunityHeaderProps {
  onNewPostClick: () => void;
}

export const CommunityHeader = ({ onNewPostClick }: CommunityHeaderProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="border-b bg-card">
      <div className="container mx-auto px-4 py-[42px]">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-1 text-left truncate">{t("community.title")}</h1>
            <p className="sm:text-sm lg:text-base text-muted-foreground text-left text-sm">
              {t("community.description")}
            </p>
          </div>
          <Button 
            onClick={onNewPostClick}
            size="default"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            {t("community.newPost")}
          </Button>
        </div>
      </div>
    </div>
  );
};
