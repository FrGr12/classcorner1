import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImagePreviewProps {
  file: File;
  onRemove: () => void;
}

const ImagePreview = ({ file, onRemove }: ImagePreviewProps) => {
  return (
    <div className="relative group">
      <img
        src={URL.createObjectURL(file)}
        alt={file.name}
        className="w-full h-32 object-cover rounded-md"
      />
      <Button
        variant="destructive"
        size="icon"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={onRemove}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ImagePreview;