
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
}: PriceDisplayProps) => {
  const { t, language } = useLanguage();
  const hasAlternativeBookings = groupBookingsEnabled || privateBookingsEnabled;
  
  // Format currency based on language
  const formatCurrency = (amount: number) => {
    if (language === 'sv') {
      return `${amount} ${t('currency')}`;
    }
    return `${t('currency')}${amount}`;
  };

  return (
    <div className="text-[14px] font-medium mt-1 text-left">
      {!hasAlternativeBookings && (
        <>{formatCurrency(price)} <span className="text-neutral-600 font-normal">{t('price.perClass')}</span></>
      )}
      {hasAlternativeBookings && basePriceGroup && (
        <div>
          {language === 'sv' ? 'Från' : 'From'} {formatCurrency(basePriceGroup)} <span className="text-neutral-600 font-normal">{t('price.perPerson')}</span>
        </div>
      )}
    </div>
  );
};

export default PriceDisplay;
