
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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

  const handleSubmit = () => {
    onSubmit(question);
    setQuestion("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]" aria-labelledby="question-dialog-title" aria-describedby="question-dialog-description">
        <DialogHeader>
          <DialogTitle id="question-dialog-title">Ask a Question</DialogTitle>
          <DialogDescription id="question-dialog-description">
            Send your question to the instructor. They'll be notified and will respond to you directly.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="question">Your Question</Label>
            <Textarea 
              id="question" 
              placeholder="What would you like to know about this class?" 
              value={question} 
              onChange={e => setQuestion(e.target.value)} 
              className="min-h-[100px]" 
              aria-required="true" 
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isLoading || !question.trim()} 
            aria-busy={isLoading}
          >
            Send Question
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionDialog;
