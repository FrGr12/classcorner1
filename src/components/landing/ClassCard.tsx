import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ClassCardProps {
  title: string;
  instructor: string;
  price: number;
  rating: number;
  images: string[];
  level: string;
  date: Date | Date[];
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
  const [isOpen, setIsOpen] = useState(false);
  const dates = Array.isArray(date) ? date : [date];
  const visibleDates = dates.slice(0, 2);
  const hasMoreDates = dates.length > 2;

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
        <p className="text-sm text-neutral-600 mb-1">by {instructor} · {city}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="text-sm font-medium">{rating}</span>
          </div>
          <p className="font-medium">${price} <span className="text-sm text-neutral-600">/ class</span></p>
        </div>
        <div className="mt-4 space-y-2">
          {visibleDates.map((d, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start text-sm text-accent-purple hover:text-accent-purple/80 hover:bg-neutral-100 border border-accent-purple/20 rounded-lg transition-all"
              onClick={() => {
                // Handle date selection
                console.log('Selected date:', d);
              }}
            >
              {format(new Date(d), 'MMM d, yyyy')}
            </Button>
          ))}
          {hasMoreDates && (
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm text-primary font-medium hover:text-primary/80 hover:bg-neutral-100 border border-neutral-200 rounded-lg"
                >
                  See more dates
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2">
                <div className="space-y-2">
                  {dates.slice(2).map((d, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-sm text-accent-purple hover:text-accent-purple/80 hover:bg-neutral-100 border border-accent-purple/20 rounded-lg transition-all"
                      onClick={() => {
                        // Handle date selection
                        console.log('Selected date:', d);
                        setIsOpen(false);
                      }}
                    >
                      {format(new Date(d), 'MMM d, yyyy')}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ClassCard;