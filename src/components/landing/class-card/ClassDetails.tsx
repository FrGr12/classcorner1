
import { Star } from "lucide-react";
import PriceDisplay from "./PriceDisplay";

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
    <div className="p-3">
      <div className="flex items-start justify-between gap-1">
        <div className="flex-1 text-left">
          <h3 className="font-medium text-[15px] leading-5 line-clamp-1">{title}</h3>
          <p className="text-[14px] text-neutral-600 mt-0.5">by {instructor} · {city}</p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-[14px] font-medium leading-4">{rating}</span>
        </div>
      </div>
      <PriceDisplay 
        price={price}
        groupBookingsEnabled={groupBookingsEnabled}
        privateBookingsEnabled={privateBookingsEnabled}
        basePriceGroup={basePriceGroup}
        basePricePrivate={basePricePrivate}
      />
    </div>
  );
};

export default ClassDetails;
