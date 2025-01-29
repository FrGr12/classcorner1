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
    <div className="p-3">
      <div className="flex items-start justify-between gap-1">
        <div className="flex-1">
          <h3 className="font-medium text-[15px] leading-5 line-clamp-1">{title}</h3>
          <p className="text-[14px] text-neutral-600 mt-0.5">by {instructor} · {city}</p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-yellow-400">★</span>
          <span className="text-[14px] font-medium">{rating}</span>
        </div>
      </div>
      <p className="text-[14px] font-medium mt-1">${price} <span className="text-neutral-600 font-normal">/ class</span></p>
    </div>
  );
};

export default ClassDetails;