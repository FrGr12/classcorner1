import { useCallback } from "react";
import { cn } from "@/lib/utils";
import DropZone from "./image-upload/DropZone";
import ImagePreview from "./image-upload/ImagePreview";

interface ImageUploadProps {
  images: File[];
  setImages: (images: File[]) => void;
  className?: string;
}

const ImageUpload = ({ images, setImages, className }: ImageUploadProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setImages([...images, ...acceptedFiles]);
    },
    [images, setImages]
  );

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className={cn("space-y-4", className)}>
      <DropZone onDrop={onDrop} />
      
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((file, index) => (
            <ImagePreview
              key={index}
              file={file}
              onRemove={() => removeImage(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;