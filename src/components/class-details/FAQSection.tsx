
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Plus, Minus, MessageCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  display_order: number;
}

const FAQSection = () => {
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: faqs, isLoading } = useQuery({
    queryKey: ['faqs', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('course_faqs')
        .select('*')
        .eq('course_id', id)
        .order('display_order');

      if (error) throw error;
      return data as FAQ[];
    }
  });

  const handleAskQuestion = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("Please sign in to ask a question");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('faq_questions')
        .insert([
          {
            course_id: id,
            student_id: user.id,
            question: "How can I help you with this class?",
            status: 'pending'
          }
        ]);

      if (error) throw error;
      toast.success("Question submitted successfully");
    } catch (error) {
      toast.error("Failed to submit question");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <section className="glass-panel rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-neutral-100 rounded-lg"></div>
          <div className="h-12 bg-neutral-100 rounded-lg"></div>
          <div className="h-12 bg-neutral-100 rounded-lg"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="glass-panel rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      {faqs && faqs.length > 0 ? (
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={`faq-${faq.id}`} className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <span className="text-left font-medium">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-neutral-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="text-center py-8">
          <MessageCircle className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No FAQs yet</h3>
          <p className="text-neutral-600 mb-4">Have a question about this class?</p>
          <Button
            variant="outline"
            onClick={handleAskQuestion}
            disabled={isSubmitting}
          >
            Ask a Question
          </Button>
        </div>
      )}
    </section>
  );
};

export default FAQSection;
