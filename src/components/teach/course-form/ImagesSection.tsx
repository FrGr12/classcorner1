
import { Card, CardContent } from "@/components/ui/card";
import ImageUpload from "@/components/teach/ImageUpload";

interface ImagesSectionProps {
  images: File[];
  setImages: (images: File[]) => void;
}

const ImagesSection = ({ images, setImages }: ImagesSectionProps) => {
  return (
    <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
      <CardContent className="p-4">
        <ImageUpload
          images={images}
          setImages={setImages}
        />
      </CardContent>
    </Card>
  );
};

export default ImagesSection;
