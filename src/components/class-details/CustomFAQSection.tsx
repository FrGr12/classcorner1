
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface CustomFAQSectionProps {
  onShowQuestion: () => void;
}

const CustomFAQSection = ({ onShowQuestion }: CustomFAQSectionProps) => {
  const faqs = [
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
  ];

  return (
    <section className="glass-panel rounded-xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <Button
          variant="outline"
          className="gap-2"
          onClick={onShowQuestion}
        >
          <MessageCircle className="h-4 w-4" />
          Ask a Question
        </Button>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default CustomFAQSection;
