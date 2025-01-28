import { Clock, MapPin, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClassItem } from "@/types/class";

interface ClassHeaderProps {
  classItem: ClassItem;
  onBooking: () => void;
}

const ClassHeader = ({ classItem, onBooking }: ClassHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">{classItem.title}</h1>
          <p className="text-neutral-600">{classItem.category}</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>2 hours</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{classItem.city}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>Max {classItem.maxParticipants} people</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent-purple text-accent-purple" />
            <span>{classItem.rating}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-right">
          <p className="text-2xl font-bold">${classItem.price}</p>
          <p className="text-sm text-neutral-600">per person</p>
        </div>
        <div className="flex gap-2">
          <Button 
            size="lg"
            className="w-full md:w-auto bg-accent-purple hover:bg-accent-purple/90"
            onClick={onBooking}
          >
            Book Now
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="w-full md:w-auto border-accent-purple text-accent-purple hover:bg-accent-purple/10"
            onClick={() => {
              console.log('Private booking requested');
            }}
          >
            Request Private Class
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClassHeader;