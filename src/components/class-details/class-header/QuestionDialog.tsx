
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface QuestionDialogProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (question: string) => void;
}

const QuestionDialog = ({
  isOpen,
  isLoading,
  onClose,
  onSubmit
}: QuestionDialogProps) => {
  const [question, setQuestion] = useState("");
  const { t } = useLanguage();

  const handleSubmit = () => {
    onSubmit(question);
    setQuestion("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]" aria-labelledby="question-dialog-title" aria-describedby="question-dialog-description">
        <DialogHeader>
          <DialogTitle id="question-dialog-title">{t('dialog.askQuestion')}</DialogTitle>
          <DialogDescription id="question-dialog-description">
            {t('dialog.questionDescription')}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="question">{t('dialog.yourQuestion')}</Label>
            <Textarea 
              id="question" 
              placeholder={t('dialog.questionPlaceholder')} 
              value={question} 
              onChange={e => setQuestion(e.target.value)} 
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
            disabled={isLoading || !question.trim()} 
            aria-busy={isLoading}
          >
            {t('dialog.sendQuestion')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionDialog;
