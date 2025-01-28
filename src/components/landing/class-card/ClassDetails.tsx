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
    <div className="space-y-2">
      <div className="space-y-1">
        <p className="text-sm text-neutral-600">{city}</p>
        <h3 className="text-lg font-medium line-clamp-1">{title}</h3>
        <p className="text-sm text-neutral-600">by {instructor}</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-yellow-400">★</span>
          <span className="text-sm font-medium">{rating.toFixed(1)}</span>
        </div>
        <p className="font-medium">
          ${price} <span className="text-sm text-neutral-600">/ class</span>
        </p>
      </div>
    </div>
  );
};

export default ClassDetails;