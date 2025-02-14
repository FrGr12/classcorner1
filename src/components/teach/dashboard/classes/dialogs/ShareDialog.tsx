
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share2, Copy, Mail, MessageSquare } from "lucide-react";

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classId: number | null;
}

const ShareDialog = ({ open, onOpenChange, classId }: ShareDialogProps) => {
  const [isSharing, setIsSharing] = useState(false);

  const getShareUrl = async () => {
    if (!classId) return "";
    
    try {
      const { data: course } = await supabase
        .from('courses')
        .select('category')
        .eq('id', classId)
        .single();

      if (course) {
        return `${window.location.origin}/class/${course.category}/${classId}`;
      }
      return "";
    } catch (error) {
      console.error('Error getting share URL:', error);
      return "";
    }
  };

  const incrementShareCount = async () => {
    if (!classId) return;

    try {
      const { data: currentCourse } = await supabase
        .from('courses')
        .select('share_count')
        .eq('id', classId)
        .single();

      await supabase
        .from('courses')
        .update({ 
          share_count: (currentCourse?.share_count || 0) + 1,
          last_shared_at: new Date().toISOString()
        })
        .eq('id', classId);
    } catch (error) {
      console.error('Error updating share count:', error);
    }
  };

  const handleShare = async (platform: string) => {
    if (!classId) return;
    
    try {
      setIsSharing(true);
      const shareUrl = await getShareUrl();
      const shareText = "Check out this class!";

      switch (platform) {
        case 'copy':
          await navigator.clipboard.writeText(shareUrl);
          toast.success("Link copied to clipboard!");
          break;
        case 'email':
          window.location.href = `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareUrl)}`;
          break;
        case 'facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
          break;
        case 'message':
          if (navigator.share) {
            await navigator.share({
              title: shareText,
              url: shareUrl
            });
          } else {
            window.location.href = `sms:?body=${encodeURIComponent(shareText + " " + shareUrl)}`;
          }
          break;
      }

      await incrementShareCount();
    } catch (error: any) {
      toast.error(error.message || "Failed to share");
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share Class
          </DialogTitle>
          <DialogDescription>
            Share this class with potential students
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Button
            variant="outline"
            className="flex items-center gap-2 justify-start"
            onClick={() => handleShare('copy')}
            disabled={isSharing}
          >
            <Copy className="h-4 w-4" />
            Copy Link
          </Button>

          <Button
            variant="outline"
            className="flex items-center gap-2 justify-start"
            onClick={() => handleShare('email')}
            disabled={isSharing}
          >
            <Mail className="h-4 w-4" />
            Share via Email
          </Button>

          <Button
            variant="outline"
            className="flex items-center gap-2 justify-start"
            onClick={() => handleShare('facebook')}
            disabled={isSharing}
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Share on Facebook
          </Button>

          <Button
            variant="outline"
            className="flex items-center gap-2 justify-start"
            onClick={() => handleShare('message')}
            disabled={isSharing}
          >
            <MessageSquare className="h-4 w-4" />
            Share via Message
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
