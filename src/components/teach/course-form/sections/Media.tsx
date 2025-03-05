
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card } from '@/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { CourseFormValues } from '../CourseFormContext';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface MediaProps {
  form: UseFormReturn<CourseFormValues>;
}

const Media = ({ form }: MediaProps) => {
  const [imagesPreview, setImagesPreview] = React.useState<string[]>([]);

  React.useEffect(() => {
    const prepareImagesPreview = async () => {
      const images = form.getValues('images') || [];
      
      if (images && images.length > 0) {
        const previewURLs = await Promise.all(
          images.map(async (image: File | string) => {
            if (typeof image === 'string') {
              return image; // It's already a URL
            } else {
              return new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.readAsDataURL(image);
              });
            }
          })
        );
        setImagesPreview(previewURLs);
      } else {
        setImagesPreview([]);
      }
    };

    prepareImagesPreview();
  }, [form.watch('images')]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const currentImages = form.getValues('images') || [];
      form.setValue('images', [...currentImages, ...newFiles], { shouldValidate: true });
    }
  };

  const removeImage = (index: number) => {
    const currentImages = form.getValues('images') || [];
    const updated = [...currentImages];
    updated.splice(index, 1);
    form.setValue('images', updated, { shouldValidate: true });
  };

  return (
    <Card className="p-6 mt-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Media</h3>
          <p className="text-sm text-muted-foreground">Upload photos of your class</p>
        </div>

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class Images</FormLabel>
              <FormControl>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    id="images"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <label
                    htmlFor="images"
                    className="cursor-pointer text-blue-500 hover:text-blue-700"
                  >
                    <Button type="button" variant="outline" className="w-full">
                      Upload Images
                    </Button>
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {imagesPreview.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
            {imagesPreview.map((src, index) => (
              <div key={index} className="relative rounded-md overflow-hidden h-40">
                <img src={src} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 text-white"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default Media;
