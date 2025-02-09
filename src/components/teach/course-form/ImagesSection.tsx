
import { Card, CardContent } from "@/components/ui/card";
import { Image as ImageIcon } from "lucide-react";
import ImageUpload from "@/components/teach/ImageUpload";

interface ImagesSectionProps {
  images: File[];
  setImages: (images: File[]) => void;
}

const ImagesSection = ({ images, setImages }: ImagesSectionProps) => {
  return (
    <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <ImageIcon className="w-5 h-5 text-accent-purple" />
          <h3 className="text-lg font-medium text-primary">Class Images</h3>
          <p className="text-sm text-muted-foreground ml-auto">
            Upload up to 5 images
          </p>
        </div>
        <ImageUpload
          images={images}
          setImages={setImages}
          className="mt-4"
        />
      </CardContent>
    </Card>
  );
};

export default ImagesSection;
