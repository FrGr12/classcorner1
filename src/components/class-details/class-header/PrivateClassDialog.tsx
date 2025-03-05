
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface PrivateClassDialogProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (message: string) => void;
}

const PrivateClassDialog = ({
  isOpen,
  isLoading,
  onClose,
  onSubmit
}: PrivateClassDialogProps) => {
  const [privateMessage, setPrivateMessage] = useState("");
  const { t } = useLanguage();

  const handleSubmit = () => {
    onSubmit(privateMessage);
    setPrivateMessage("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]" aria-labelledby="private-class-dialog-title" aria-describedby="private-class-dialog-description">
        <DialogHeader>
          <DialogTitle id="private-class-dialog-title">{t('dialog.requestPrivate')}</DialogTitle>
          <DialogDescription id="private-class-dialog-description">
            {t('dialog.privateDescription')}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="message">{t('dialog.message')}</Label>
            <Textarea 
              id="message" 
              placeholder={t('dialog.privatePlaceholder')} 
              value={privateMessage} 
              onChange={e => setPrivateMessage(e.target.value)} 
              className="min-h-[100px]" 
              aria-required="true" 
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {t('dialog.cancel')}
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isLoading || !privateMessage.trim()} 
            aria-busy={isLoading}
          >
            {t('dialog.sendRequest')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PrivateClassDialog;
