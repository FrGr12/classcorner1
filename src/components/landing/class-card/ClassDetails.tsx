interface ClassDetailsProps {
  title: string;
  instructor: string;
  city: string;
  rating: number;
  price: number;
  groupBookingsEnabled?: boolean;
  privateBookingsEnabled?: boolean;
  basePriceGroup?: number;
  basePricePrivate?: number;
}

const ClassDetails = ({
  title,
  instructor,
  city,
  rating,
  price,
  groupBookingsEnabled,
  privateBookingsEnabled,
  basePriceGroup,
  basePricePrivate,
}: ClassDetailsProps) => {
  return (
    <div className="p-4">
      <div className="flex items-start justify-between mb-1">
        <h3 className="text-lg font-medium line-clamp-1">{title}</h3>
      </div>
      <p className="text-sm text-neutral-600 mb-1">by {instructor} · {city}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-yellow-400">★</span>
          <span className="text-sm font-medium">{rating}</span>
        </div>
        <div className="text-right">
          <p className="font-medium">${price} <span className="text-sm text-neutral-600">/ class</span></p>
          {(groupBookingsEnabled || privateBookingsEnabled) && (
            <p className="text-sm text-neutral-600">
              {groupBookingsEnabled && `From $${basePriceGroup}/person (group)`}
              {groupBookingsEnabled && privateBookingsEnabled && ' · '}
              {privateBookingsEnabled && `Private $${basePricePrivate}`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;