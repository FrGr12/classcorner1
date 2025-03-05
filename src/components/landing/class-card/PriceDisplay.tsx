
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

  return (
    <div className="text-[14px] font-medium mt-1 text-left">
      {!hasAlternativeBookings && (
        <>${price} <span className="text-neutral-600 font-normal">/ class</span></>
      )}
      {hasAlternativeBookings && basePriceGroup && (
        <div>From ${basePriceGroup} <span className="text-neutral-600 font-normal">/ person (group)</span></div>
      )}
    </div>
  );
};

export default PriceDisplay;
