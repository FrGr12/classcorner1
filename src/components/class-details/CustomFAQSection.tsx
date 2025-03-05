
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Plus } from "lucide-react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FAQ {
  question: string;
  answer: string;
}

interface CustomFAQSectionProps {
  onShowQuestion: () => void;
  isInstructor?: boolean;
  classId?: number;
}

const CustomFAQSection = ({ onShowQuestion, isInstructor, classId }: CustomFAQSectionProps) => {
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      question: "What happens if I need to cancel?",
      answer: "You can cancel up to 48 hours before the class starts for a full refund. Cancellations within 48 hours are non-refundable but can be rescheduled."
    },
    {
      question: "Do I need to bring anything?",
      answer: "All materials are included in the class price. Just bring yourself and your creativity!"
    },
    {
      question: "Is this class suitable for beginners?",
      answer: "Yes! Our classes are designed to accommodate all skill levels, from complete beginners to more experienced crafters."
    }
  ]);

  const [isAddingFAQ, setIsAddingFAQ] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  const handleAddFAQ = async () => {
    try {
      if (!newQuestion.trim() || !newAnswer.trim()) {
        toast.error("Please fill in both question and answer fields");
        return;
      }

      // In a real app, this would be an API call
      setFaqs([...faqs, { question: newQuestion, answer: newAnswer }]);
      setNewQuestion("");
      setNewAnswer("");
      setIsAddingFAQ(false);
      toast.success("FAQ added successfully");
    } catch (error) {
      toast.error("Failed to add FAQ");
    }
  };

  const handleDeleteFAQ = async (index: number) => {
    try {
      const updatedFaqs = faqs.filter((_, i) => i !== index);
      setFaqs(updatedFaqs);
      toast.success("FAQ deleted successfully");
    } catch (error) {
      toast.error("Failed to delete FAQ");
    }
  };

  return (
    <section className="glass-panel rounded-xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="flex gap-2">
          {isInstructor && (
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => setIsAddingFAQ(true)}
            >
              <Plus className="h-4 w-4" />
              Add FAQ
            </Button>
          )}
          <Button
            variant="outline"
            className="gap-2"
            onClick={onShowQuestion}
          >
            <MessageCircle className="h-4 w-4" />
            Ask a Question
          </Button>
        </div>
      </div>
      
      {faqs.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No FAQs yet. {isInstructor ? "Add some FAQs to help your students!" : "Be the first to ask a question!"}
        </div>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <div className="flex items-start justify-between">
                <AccordionTrigger className="text-left flex-1">
                  {faq.question}
                </AccordionTrigger>
                {isInstructor && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive/90 mt-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteFAQ(index);
                    }}
                  >
                    Delete
                  </Button>
                )}
              </div>
              <AccordionContent>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      <Dialog open={isAddingFAQ} onOpenChange={setIsAddingFAQ}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New FAQ</DialogTitle>
            <DialogDescription>
              Add a frequently asked question and its answer to help your students.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="question" className="text-sm font-medium">Question</label>
              <Input
                id="question"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="What do students often ask?"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="answer" className="text-sm font-medium">Answer</label>
              <Textarea
                id="answer"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                placeholder="Provide a clear and helpful answer"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingFAQ(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddFAQ}>
              Add FAQ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CustomFAQSection;
