import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface ClassCardProps {
  title: string;
  instructor: string;
  price: number;
  rating: number;
  images: string[];
  level: string;
  date: Date;
  city: string;
}

const ClassCard = ({
  title,
  instructor,
  price,
  rating,
  level,
  date,
  city,
}: ClassCardProps) => {
  return (
    <Card className="overflow-hidden group">
      <div 
        className="relative aspect-[4/3] overflow-hidden"
        style={{
          background: "linear-gradient(90deg, hsla(277, 75%, 84%, 1) 0%, hsla(297, 50%, 51%, 1) 100%)"
        }}
      >
        <Badge 
          variant="secondary" 
          className="absolute top-3 right-3 bg-white/90 text-primary border-none hover:bg-white"
        >
          {level}
        </Badge>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-lg font-medium line-clamp-1">{title}</h3>
        </div>
        <p className="text-sm text-neutral-600 mb-1">by {instructor}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="text-sm font-medium">{rating}</span>
          </div>
          <p className="font-medium">${price} <span className="text-sm text-neutral-600">/ class</span></p>
        </div>
        <div className="flex items-center justify-between mt-1">
          <p className="text-sm text-neutral-600">
            {format(new Date(date), 'MMM d, yyyy')}
          </p>
          <p className="text-sm text-neutral-600">{city}</p>
        </div>
      </div>
    </Card>
  );
};

export default ClassCard;