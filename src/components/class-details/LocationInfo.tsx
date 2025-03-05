
import { MapPin } from "lucide-react";
import { ClassItem } from "@/types/class";
import { useLanguage } from "@/contexts/LanguageContext";

interface LocationInfoProps {
  classItem: ClassItem;
}

const LocationInfo = ({
  classItem
}: LocationInfoProps) => {
  const { t } = useLanguage();
  
  return <section className="glass-panel rounded-xl p-8">
      <h2 className="font-bold mb-6 text-left text-2xl">{t("class.location")}</h2>
      <div className="space-y-4">
        <div className="flex items-start gap-4 text-neutral-600">
          <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
          <div className="text-left">
            <p className="font-medium">{classItem.city} Studio</p>
            <p>Kreativitetsgatan 123</p>
            <p>{classItem.city}, Sverige</p>
            <p className="mt-2 text-sm">{t("class.freeParking")}</p>
            <p className="text-sm">{t("class.nearStation")}</p>
          </div>
        </div>
        <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto">
          <div className="aspect-video bg-neutral-100 rounded-lg mt-6" />
        </div>
      </div>
    </section>;
};

export default LocationInfo;
