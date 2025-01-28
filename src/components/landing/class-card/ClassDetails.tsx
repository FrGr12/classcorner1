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
}: ClassDetailsProps) => {
  return (
    <div className="space-y-1">
      <div className="flex items-start justify-between">
        <h3 className="text-base font-medium line-clamp-1">{title}</h3>
      </div>
      <p className="text-sm text-neutral-600 line-clamp-1">by {instructor} · {city}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-yellow-400">★</span>
          <span className="text-sm font-medium">{rating}</span>
        </div>
        <p className="font-medium text-sm">${price} <span className="text-neutral-600">/ class</span></p>
      </div>
    </div>
  );
};

export default ClassDetails;