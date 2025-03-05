
import { Link } from "react-router-dom";
import { Clock, MapPin, Users, Star } from "lucide-react";
import { ClassItem } from "@/types/class";

interface ClassMetadataProps {
  classItem: ClassItem;
  onReviewsClick: () => void;
  participantRange: string;
}

const ClassMetadata = ({ 
  classItem, 
  onReviewsClick,
  participantRange
}: ClassMetadataProps) => {
  return (
    <div className="space-y-4 text-left">
      <div>
        <h1 className="font-bold mb-2 text-left text-2xl">{classItem.title}</h1>
        <p className="text-neutral-600 text-left">{classItem.category}</p>
      </div>
      
      <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600">
        <div className="flex items-center gap-1" aria-label="Duration: 2 hours">
          <Clock className="h-4 w-4" aria-hidden="true" />
          <span>2 hours</span>
        </div>
        <div className="flex items-center gap-1" aria-label={`Location: ${classItem.city}`}>
          <MapPin className="h-4 w-4" aria-hidden="true" />
          <span>{classItem.city}</span>
        </div>
        <div className="flex items-center gap-1" aria-label={`Class size: ${participantRange}`}>
          <Users className="h-4 w-4" aria-hidden="true" />
          <span>{participantRange}</span>
        </div>
        <Link 
          to={`/instructor/${classItem.instructor_id || '1'}`} 
          className="flex items-center gap-1 hover:text-accent-purple transition-colors cursor-pointer" 
          aria-label={`Instructor: ${classItem.instructor}`}
        >
          <span>{classItem.instructor}</span>
        </Link>
        <button 
          onClick={onReviewsClick} 
          className="flex items-center gap-1 hover:text-accent-purple transition-colors cursor-pointer" 
          aria-label={`Rating: ${classItem.rating} stars. Click to view reviews`}
        >
          <Star className="h-4 w-4 fill-accent-purple text-accent-purple" aria-hidden="true" />
          <span>{classItem.rating}</span>
        </button>
      </div>
    </div>
  );
};

export default ClassMetadata;
