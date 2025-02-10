
import ImageCarousel from "@/components/landing/class-card/ImageCarousel";

interface PhotoGalleryProps {
  images: string[];
  title: string;
}

const PhotoGallery = ({ images, title }: PhotoGalleryProps) => {
  return (
    <section className="glass-panel rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-left">Photo Gallery</h2>
      <div className="h-[240px]">
        <ImageCarousel images={images} title={title} />
      </div>
    </section>
  );
};

export default PhotoGallery;
