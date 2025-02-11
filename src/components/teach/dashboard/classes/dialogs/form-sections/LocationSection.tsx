
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClassData } from "../EditClassDialog";

interface LocationSectionProps {
  formData: ClassData;
  setFormData: (data: ClassData) => void;
}

const LocationSection = ({ formData, setFormData }: LocationSectionProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="location">Location</Label>
      <Input
        id="location"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        required
      />
    </div>
  );
};

export default LocationSection;
