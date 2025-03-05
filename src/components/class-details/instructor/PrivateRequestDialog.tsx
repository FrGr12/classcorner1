
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ClassItem } from "@/types/class";
import { useLanguage } from "@/contexts/LanguageContext";

interface PrivateRequestDialogProps {
  isOpen: boolean;
  onClose: () => void;
  classItem: ClassItem;
}

const PrivateRequestDialog = ({
  isOpen,
  onClose,
  classItem,
}: PrivateRequestDialogProps) => {
  const [privateMessage, setPrivateMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handlePrivateRequest = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: t("auth.required"),
          description: t("class.signInToRequest"),
          variant: "destructive"
        });
        return;
      }

      const { error: messageError } = await supabase
        .from("communications")
        .insert({
          student_id: user.id,
          instructor_id: classItem.instructor_id,
          course_id: classItem.id,
          message_content: privateMessage,
          message_type: "private_request",
          status: "pending"
        });

      if (messageError) throw messageError;

      toast({
        title: t("message.success"),
        description: t("class.privateRequestSent")
      });
      onClose();
      setPrivateMessage("");
    } catch (error) {
      console.error('Error sending private request:', error);
      toast({
        title: t("message.error"),
        description: t("class.privateRequestFailed")
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">{t("class.requestPrivate")}</DialogTitle>
          <DialogDescription className="text-sm">
            {t("class.privateDescription")}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 sm:gap-4 py-3 sm:py-4">
          <div className="grid gap-2">
            <Label htmlFor="message" className="text-sm">{t("message.message")}</Label>
            <Textarea
              id="message"
              placeholder={t("class.privateMessagePlaceholder")}
              value={privateMessage}
              onChange={(e) => setPrivateMessage(e.target.value)}
              className="min-h-[100px] text-sm"
            />
          </div>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={onClose}
            className="text-sm"
          >
            {t("message.cancel")}
          </Button>
          <Button
            onClick={handlePrivateRequest}
            disabled={isLoading || !privateMessage.trim()}
            className="text-sm"
          >
            {t("message.send")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PrivateRequestDialog;
