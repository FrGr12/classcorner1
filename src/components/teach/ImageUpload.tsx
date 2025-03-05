
import { useCallback } from "react";
import { cn } from "@/lib/utils";
import DropZone from "./image-upload/DropZone";
import ImagePreview from "./image-upload/ImagePreview";

interface ImageUploadProps {
  images: File[];
  setImages: (images: File[]) => void;
  className?: string;
  maxImages?: number;
}

const ImageUpload = ({ images, setImages, className, maxImages }: ImageUploadProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // If maxImages is specified, limit the number of images
      if (maxImages && images.length + acceptedFiles.length > maxImages) {
        const availableSlots = Math.max(0, maxImages - images.length);
        const limitedFiles = acceptedFiles.slice(0, availableSlots);
        setImages([...images, ...limitedFiles]);
      } else {
        setImages([...images, ...acceptedFiles]);
      }
    },
    [images, setImages, maxImages]
  );

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className={cn("space-y-4", className)}>
      <DropZone onDrop={onDrop} maxImages={maxImages} />
      
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
