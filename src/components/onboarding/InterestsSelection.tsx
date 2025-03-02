
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface InterestsSelectionProps {
  interests: string[];
  onInterestToggle: (category: string) => void;
}

export const InterestsSelection = ({ interests, onInterestToggle }: InterestsSelectionProps) => {
  const categories = [
    "Pottery", "Cooking", "Baking", "Painting & Art", "Candle Making",
    "Jewellery & Metal", "Cocktail & Wine", "Photography", "Music & Dance",
    "Wood Craft", "Textile Craft", "Paper Craft", "Flower & Plants"
  ];

  return (
    <div className="space-y-2">
      <Label>Interests</Label>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            type="button"
            variant={interests.includes(category) ? "default" : "outline"}
            size="sm"
            onClick={() => onInterestToggle(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};
