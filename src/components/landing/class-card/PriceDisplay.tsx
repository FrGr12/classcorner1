
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
  const hasAlternativeBookings = groupBookingsEnabled || privateBookingsEnabled;
  const { t } = useLanguage();

  return (
    <div className="text-[14px] font-medium mt-1 text-left">
      {!hasAlternativeBookings && (
        <>{price} kr <span className="text-neutral-600 font-normal">/ {t("class.perClass")}</span></>
      )}
      {hasAlternativeBookings && basePriceGroup && (
        <div>{t("class.from")} {basePriceGroup} kr <span className="text-neutral-600 font-normal">/ {t("class.personGroup")}</span></div>
      )}
    </div>
  );
};

export default PriceDisplay;
