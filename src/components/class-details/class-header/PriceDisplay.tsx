
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface PriceDisplayProps {
  price: number;
}

const PriceDisplay = ({ price }: PriceDisplayProps) => {
  const { t, language } = useLanguage();
  
  // Format currency based on language
  const formatCurrency = (amount: number) => {
    if (language === 'sv') {
      return `${amount} ${t('currency')}`;
    }
    return `${t('currency')}${amount}`;
  };

  return (
    <div className="text-right">
      <p className="text-2xl font-bold" aria-label={`${t('price.label')}: ${formatCurrency(price)} ${t('price.perPerson')}`}>
        {formatCurrency(price)}
      </p>
      <p className="text-sm text-neutral-600">{t('price.perPerson')}</p>
    </div>
  );
};

export default PriceDisplay;
