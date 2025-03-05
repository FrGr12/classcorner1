
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SaveButton = () => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = useCallback((e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
    
    // Provide user feedback with a toast notification
    toast(
      isSaved ? "Removed from saved classes" : "Added to saved classes",
      { 
        duration: 2000,
        position: "bottom-right" 
      }
    );
  }, [isSaved]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Handle keyboard activation with space or enter
    if (e.key === "Enter" || e.key === " ") {
      handleSave(e);
    }
  }, [handleSave]);

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className="absolute top-3 right-3 bg-white/90 text-primary hover:bg-white rounded-full z-10 p-1.5 h-auto w-auto focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-purple"
      onClick={handleSave}
      onKeyDown={handleKeyDown}
      aria-label={isSaved ? "Remove from saved classes" : "Save this class"}
      aria-pressed={isSaved}
      tabIndex={0}
    >
      <Heart 
        className={`w-[18px] h-[18px] ${isSaved ? 'fill-red-500 text-red-500' : 'fill-none text-neutral-600'}`}
        aria-hidden="true"
      />
      <span className="sr-only">{isSaved ? "Unsave" : "Save"}</span>
    </Button>
  );
};

export default SaveButton;
