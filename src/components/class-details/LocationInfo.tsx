import { MapPin } from "lucide-react";
import { ClassItem } from "@/types/class";

interface LocationInfoProps {
  classItem: ClassItem;
}

const LocationInfo = ({ classItem }: LocationInfoProps) => {
  return (
    <section className="glass-panel rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-6">Location</h2>
      <div className="space-y-4">
        <div className="flex items-start gap-4 text-neutral-600">
          <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
          <div>
            <p className="font-medium">{classItem.city} Studio</p>
            <p>123 Creative Street</p>
            <p>{classItem.city}, Sweden</p>
            <p className="mt-2 text-sm">Free street parking available</p>
            <p className="text-sm">5 min walk from Central Station</p>
          </div>
        </div>
        <div className="aspect-video bg-neutral-100 rounded-lg mt-6">
          {/* Map will be implemented here */}
        </div>
      </div>
    </section>
  );
};

export default LocationInfo;