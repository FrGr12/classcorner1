
import { Label } from "@/components/ui/label";
import ImageUpload from "@/components/teach/ImageUpload";

interface ImagesSectionProps {
  images: File[];
  setImages: (images: File[]) => void;
}

const ImagesSection = ({ images, setImages }: ImagesSectionProps) => {
  return (
    <div className="space-y-2">
      <Label>Class Images</Label>
      <ImageUpload
        images={images}
        setImages={setImages}
      />
    </div>
  );
};

export default ImagesSection;
