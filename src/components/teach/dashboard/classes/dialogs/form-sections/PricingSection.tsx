
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClassData } from "../EditClassDialog";

interface PricingSectionProps {
  formData: ClassData;
  setFormData: (data: ClassData) => void;
}

const PricingSection = ({ formData, setFormData }: PricingSectionProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
          required
          min={0}
          step={0.01}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="duration">Duration</Label>
        <Input
          id="duration"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          placeholder="e.g., 2 hours"
          required
        />
      </div>
    </div>
  );
};

export default PricingSection;
