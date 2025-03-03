
import { ClassItem } from "@/types/class";
import { Clock, MapPin, Users, Star } from "lucide-react";

interface ClassInfoSummaryProps {
  classItem: ClassItem;
}

const ClassInfoSummary = ({ classItem }: ClassInfoSummaryProps) => {
  return (
    <div className="glass-panel rounded-xl p-8 mb-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">{classItem.title}</h2>
          <p className="text-neutral-600">{classItem.category}</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{classItem.duration || '2 hours'}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{classItem.city}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>Max {classItem.maxParticipants || 10} people</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent-purple text-accent-purple" />
            <span>{classItem.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassInfoSummary;
