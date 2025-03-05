
import { Button } from "@/components/ui/button";

interface PriceDisplayProps {
  price: number;
}

const PriceDisplay = ({ price }: PriceDisplayProps) => {
  return (
    <div className="text-right">
      <p className="text-2xl font-bold" aria-label={`Price: $${price} per person`}>${price}</p>
      <p className="text-sm text-neutral-600">per person</p>
    </div>
  );
};

export default PriceDisplay;
