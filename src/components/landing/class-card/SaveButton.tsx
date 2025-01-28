import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const SaveButton = () => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  return (
    <Badge 
      variant="secondary" 
      className="absolute top-3 right-3 bg-white/90 text-primary border-none hover:bg-white cursor-pointer transition-all duration-200 z-10 p-2.5"
      onClick={handleSave}
    >
      <Heart 
        className={`w-5 h-5 ${isSaved ? 'fill-red-500 text-red-500' : 'fill-none text-neutral-600'}`}
      />
    </Badge>
  );
};

export default SaveButton;