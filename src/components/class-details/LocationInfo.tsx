import { MapPin } from "lucide-react";
import { ClassItem } from "@/types/class";
interface LocationInfoProps {
  classItem: ClassItem;
}
const LocationInfo = ({
  classItem
}: LocationInfoProps) => {
  return <section className="glass-panel rounded-xl p-8">
      <h2 className="font-bold mb-6 text-left text-2xl">Location</h2>
      <div className="space-y-4">
        <div className="flex items-start gap-4 text-neutral-600">
          <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
          <div className="text-left">
            <p className="font-medium">{classItem.city} Studio</p>
            <p>123 Creative Street</p>
            <p>{classItem.city}, Sweden</p>
            <p className="mt-2 text-sm">Free street parking available</p>
            <p className="text-sm">5 min walk from Central Station</p>
          </div>
        </div>
        <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto">
          <div className="aspect-video bg-neutral-100 rounded-lg mt-6" />
        </div>
      </div>
    </section>;
};
export default LocationInfo;