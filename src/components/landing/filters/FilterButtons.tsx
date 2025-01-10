import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterButtonsProps {
  selectedCategory: string | null;
  selectedLocation: string;
  selectedTime: string;
  setSelectedCategory: (category: string | null) => void;
  setOpen: (open: boolean) => void;
}

const FilterButtons = ({
  selectedCategory,
  selectedLocation,
  selectedTime,
  setSelectedCategory,
  setOpen,
}: FilterButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <Button
        variant="outline"
        className={cn(
          "rounded-full",
          !selectedCategory && "bg-accent-purple text-white hover:bg-accent-purple/90"
        )}
        onClick={() => setSelectedCategory(null)}
      >
        All classes
      </Button>
      <Button
        variant="outline"
        className="rounded-full"
        onClick={() => setOpen(true)}
      >
        {selectedLocation}
      </Button>
      <Button
        variant="outline"
        className="rounded-full"
      >
        {selectedTime}
      </Button>
    </div>
  );
};

export default FilterButtons;