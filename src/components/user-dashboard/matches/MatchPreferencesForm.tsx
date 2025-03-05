
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Bell, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categories = ["Pottery", "Cooking", "Baking", "Painting & Art", "Candle Making", "Jewellery & Metal", "Cocktail & Wine", "Photography", "Music & Dance", "Wood Craft", "Textile Craft", "Paper Craft", "Flower & Plants"];
const cities = ["Stockholm", "Göteborg", "Malmö", "Uppsala", "Västerås", "Örebro", "Linköping", "Helsingborg", "Jönköping", "Norrköping"];

interface MatchPreferencesFormProps {
  onEnableMatching: (location: string, selectedCategories: string[]) => void;
  initialLocation?: string;
  initialCategories?: string[];
}

const MatchPreferencesForm = ({ 
  onEnableMatching,
  initialLocation = "",
  initialCategories = []
}: MatchPreferencesFormProps) => {
  const [location, setLocation] = useState(initialLocation);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { toast } = useToast();

  const handleAddCategory = () => {
    if (!selectedCategory) {
      toast({
        title: "No category selected",
        description: "Please select a category to add",
        variant: "destructive",
      });
      return;
    }

    if (selectedCategories.includes(selectedCategory)) {
      toast({
        title: "Category already added",
        description: "This category is already in your interests",
        variant: "destructive",
      });
      return;
    }

    setSelectedCategories(prev => [...prev, selectedCategory]);
    setSelectedCategory("");
  };

  const handleRemoveCategory = (category: string) => {
    setSelectedCategories(selectedCategories.filter(c => c !== category));
  };

  const availableCategories = categories.filter(
    category => !selectedCategories.includes(category)
  );

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Location</label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Select your location" />
            </SelectTrigger>
            <SelectContent>
              {cities.map(city => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Interests</label>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((category) => (
                <Badge key={category} variant="secondary" className="gap-1 text-sm py-1 px-2">
                  {category}
                  <button
                    onClick={() => handleRemoveCategory(category)}
                    className="ml-1 hover:text-destructive"
                    aria-label={`Remove ${category}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select an interest" />
                </SelectTrigger>
                <SelectContent>
                  {availableCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                onClick={handleAddCategory}
                className="bg-[#6E44FF] hover:bg-[#6E44FF]/90"
              >
                Add Interest
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Button 
        onClick={() => onEnableMatching(location, selectedCategories)}
        className="w-full bg-[#6E44FF] hover:bg-[#6E44FF]/90"
        disabled={!location || selectedCategories.length === 0}
      >
        <Bell className="w-4 h-4 mr-2" />
        Enable Class Recommendations
      </Button>
    </div>
  );
};

export default MatchPreferencesForm;
