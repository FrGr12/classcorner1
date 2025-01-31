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
  const hasAlternativeBookings = groupBookingsEnabled || privateBookingsEnabled;

  return (
    <div className="text-[14px] font-medium mt-1">
      {!hasAlternativeBookings && (
        <>${price} <span className="text-neutral-600 font-normal">/ class</span></>
      )}
      {hasAlternativeBookings && (
        <div className="space-y-0.5">
          {groupBookingsEnabled && basePriceGroup && (
            <div>From ${basePriceGroup} <span className="text-neutral-600 font-normal">/ person (group)</span></div>
          )}
          {privateBookingsEnabled && basePricePrivate && (
            <div>${basePricePrivate} <span className="text-neutral-600 font-normal">/ private class</span></div>
          )}
        </div>
      )}
    </div>
  );
};

export default PriceDisplay;