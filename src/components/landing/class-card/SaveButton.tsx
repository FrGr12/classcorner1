
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const SaveButton = () => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className="absolute top-3 right-3 bg-white/90 text-primary hover:bg-white rounded-full z-10 p-1.5 h-auto w-auto"
      onClick={handleSave}
      aria-label={isSaved ? "Remove from saved classes" : "Save this class"}
      aria-pressed={isSaved}
    >
      <Heart 
        className={`w-[18px] h-[18px] ${isSaved ? 'fill-red-500 text-red-500' : 'fill-none text-neutral-600'}`}
        aria-hidden="true"
      />
    </Button>
  );
};

export default SaveButton;
