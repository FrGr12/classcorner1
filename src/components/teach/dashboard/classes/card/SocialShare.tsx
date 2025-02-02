import { Share2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface SocialShareProps {
  courseId: number;
  category: string;
}

const SocialShare = ({ courseId, category }: SocialShareProps) => {
  const handleShare = async () => {
    try {
      const shareUrl = `${window.location.origin}/class/${category}/${courseId}`;
      
      if (navigator.share) {
        await navigator.share({
          title: 'Check out this class!',
          url: shareUrl
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard!");
      }

      // Get current share count
      const { data: currentCourse, error: fetchError } = await supabase
        .from('courses')
        .select('share_count')
        .eq('id', courseId)
        .single();

      if (fetchError) throw fetchError;

      // Update share count in database
      const { error: updateError } = await supabase
        .from('courses')
        .update({ 
          share_count: (currentCourse?.share_count || 0) + 1,
          last_shared_at: new Date().toISOString()
        })
        .eq('id', courseId);

      if (updateError) throw updateError;

    } catch (error) {
      console.error('Error sharing:', error);
      toast.error("Failed to share class");
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="w-full" 
      onClick={handleShare}
    >
      {navigator.share ? (
        <>
          <Share2 className="h-4 w-4 mr-2" />
          Share Class
        </>
      ) : (
        <>
          <Copy className="h-4 w-4 mr-2" />
          Copy Link
        </>
      )}
    </Button>
  );
};

export default SocialShare;