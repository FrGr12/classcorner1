
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface PriceDisplayProps {
  price: number;
}

const PriceDisplay = ({ price }: PriceDisplayProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="text-right">
      <p className="text-2xl font-bold" aria-label={`Price: ${price} kr per person`}>{price} kr</p>
      <p className="text-sm text-neutral-600">{t("class.perPerson")}</p>
    </div>
  );
};

export default PriceDisplay;
