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
}

const ClassCard = ({
  title,
  instructor,
  price,
  rating,
  level,
  date,
}: ClassCardProps) => {
  return (
    <Card className="overflow-hidden group">
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
          <Badge 
            variant="secondary" 
            className="bg-white text-primary border border-neutral-200 hover:bg-white/90"
          >
            {level}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-2">by {instructor}</p>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="text-sm font-medium">{rating}</span>
          </div>
          <span className="font-semibold">${price}</span>
        </div>
        <p className="text-sm text-muted-foreground">
          {format(new Date(date), 'MMM d, yyyy')}
        </p>
      </div>
    </Card>
  );
};

export default ClassCard;