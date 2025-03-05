
import { useLanguage } from "@/contexts/LanguageContext";

interface PriceDisplayProps {
  price: number;
  groupBookingsEnabled?: boolean;
  privateBookingsEnabled?: boolean;
  basePriceGroup?: number;
  basePricePrivate?: number;
}

const PriceDisplay = ({
  price,
  groupBookingsEnabled,
  privateBookingsEnabled,
  basePriceGroup,
  basePricePrivate,
}: PriceDisplayProps) => {
  const { t, language } = useLanguage();

  // Format currency based on language
  const formatCurrency = (amount: number) => {
    if (language === 'sv') {
      return `${amount} ${t('currency')}`;
    }
    return `${t('currency')}${amount}`;
  };

  return (
    <div className="mt-2">
      <p className="text-sm font-semibold">
        {formatCurrency(price)} <span className="text-xs font-normal text-neutral-500">{t('price.perPerson')}</span>
      </p>
    </div>
  );
};

export default PriceDisplay;
