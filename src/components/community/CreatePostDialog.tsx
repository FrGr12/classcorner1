import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Image } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function CreatePostDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const { toast } = useToast();

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(prevImages => [...prevImages, ...files]);
    
    // Create preview URLs
    const urls = files.map(file => URL.createObjectURL(file));
    setImageUrls(prevUrls => [...prevUrls, ...urls]);
  };

  const removeImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
    setImageUrls(prevUrls => prevUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create a post",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Upload images if any
      const uploadedImageUrls = [];
      
      for (const image of images) {
        const fileExt = image.name.split('.').pop();
        const filePath = `${crypto.randomUUID()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('post-images')
          .upload(filePath, image);
          
        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('post-images')
          .getPublicUrl(filePath);
          
        uploadedImageUrls.push(publicUrl);
      }

      const { error } = await supabase.from('posts').insert({
        title: title.trim(),
        content: content.trim(),
        tags,
        author_id: user.id,
        votes: 0,
        images: uploadedImageUrls
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Post created successfully!"
      });
      
      setIsOpen(false);
      setTitle("");
      setContent("");
      setTags([]);
      setImages([]);
      setImageUrls([]);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Create a new post</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Input 
              placeholder="Post title" 
              value={title} 
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Textarea 
              placeholder="Write your post content here..." 
              className="min-h-[200px]" 
              value={content} 
              onChange={e => setContent(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Input 
              placeholder="Add tags (press Enter to add)" 
              value={tagInput} 
              onChange={e => setTagInput(e.target.value)} 
              onKeyDown={handleAddTag}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map(tag => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="cursor-pointer" 
                  onClick={() => removeTag(tag)}
                >
                  {tag} ×
                </Badge>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                <Image className="h-4 w-4 mr-2" />
                Add Images
              </Button>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
            {imageUrls.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mt-2">
                {imageUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <button
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <Button 
              onClick={handleSubmit} 
              isLoading={isLoading}
              loadingText="Creating..."
              size="default"
            >
              Create Post
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
