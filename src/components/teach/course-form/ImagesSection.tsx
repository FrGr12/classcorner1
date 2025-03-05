
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ImageUpload from "@/components/teach/ImageUpload";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ImagesSectionProps {
  images: File[];
  setImages: (images: File[]) => void;
}

const ImagesSection = ({ images, setImages }: ImagesSectionProps) => {
  const [error, setError] = useState<string | null>(null);

  const handleImagesChange = (newImages: File[]) => {
    // Validate file sizes (max 5MB per image)
    const oversizedImages = newImages.filter(img => img.size > 5 * 1024 * 1024);
    
    if (oversizedImages.length > 0) {
      setError("Some images exceed the maximum size of 5MB");
      return;
    }
    
    setError(null);
    setImages(newImages);
  };

  return (
    <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
      <CardContent className="p-4">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="mb-3">
          <h3 className="text-sm font-medium text-neutral-700">Course Images</h3>
          <p className="text-xs text-neutral-500">
            Add up to 5 high-quality images (max 5MB each). First image will be used as the course thumbnail.
          </p>
        </div>
        
        <ImageUpload
          images={images}
          setImages={handleImagesChange}
          maxImages={5}
        />
      </CardContent>
    </Card>
  );
};

export default ImagesSection;
