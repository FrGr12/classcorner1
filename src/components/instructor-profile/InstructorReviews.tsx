
import { useState } from "react";
import { MessageSquare, Star, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { InstructorProfile, InstructorReview } from "@/types/instructor";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface InstructorReviewsProps {
  reviews: InstructorReview[];
  instructor: InstructorProfile;
}

const InstructorReviews = ({ reviews, instructor }: InstructorReviewsProps) => {
  const [activeTab, setActiveTab] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<InstructorReview | null>(null);
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Filter reviews based on active tab
  const filteredReviews = reviews.filter(review => {
    if (activeTab === "all") return true;
    if (activeTab === "positive") return review.rating >= 4;
    if (activeTab === "neutral") return review.rating === 3;
    if (activeTab === "negative") return review.rating < 3;
    return true;
  });
  
  const handleOpenResponseDialog = (review: InstructorReview) => {
    setSelectedReview(review);
    setResponse(review.instructorResponse || "");
    setIsDialogOpen(true);
  };
  
  const handleSubmitResponse = async () => {
    if (!selectedReview) return;
    
    try {
      setIsLoading(true);
      
      const { error } = await supabase
        .from('course_reviews')
        .update({ instructor_response: response })
        .eq('id', selectedReview.id);
      
      if (error) throw error;
      
      toast.success("Response submitted successfully");
      setIsDialogOpen(false);
      
      // Update the local state
      const updatedReviews = reviews.map(review => 
        review.id === selectedReview.id 
          ? { ...review, instructorResponse: response } 
          : review
      );
      
      // We need to update the reviews state here - in a real app this would be handled by a state management library
    } catch (error) {
      console.error("Error submitting response:", error);
      toast.error("Failed to submit response");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-accent-purple" />
          Student Reviews
        </h2>
        
        {instructor.averageRating !== undefined && (
          <div className="flex items-center gap-1 bg-accent-purple/5 p-2 rounded-lg">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`h-4 w-4 ${star <= Math.round(instructor.averageRating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-300'}`} 
                />
              ))}
            </div>
            <span className="font-semibold">{instructor.averageRating.toFixed(1)}</span>
            <span className="text-neutral-500">({instructor.totalReviews})</span>
          </div>
        )}
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Reviews</TabsTrigger>
          <TabsTrigger value="positive">Positive</TabsTrigger>
          <TabsTrigger value="neutral">Neutral</TabsTrigger>
          <TabsTrigger value="negative">Negative</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-0">
          {filteredReviews.length === 0 ? (
            <div className="text-center py-8 text-neutral-500">
              No reviews in this category.
            </div>
          ) : (
            <div className="space-y-6">
              {filteredReviews.map((review) => (
                <div key={review.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarImage src={review.reviewerAvatar} />
                        <AvatarFallback>{review.reviewerName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{review.reviewerName}</div>
                        <div className="text-neutral-500 text-sm">{review.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`h-4 w-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  
                  {review.className && (
                    <div className="mt-2 text-sm text-accent-purple">
                      Class: {review.className}
                    </div>
                  )}
                  
                  <div className="mt-3 text-neutral-700">
                    {review.comment}
                  </div>
                  
                  {review.instructorResponse && (
                    <div className="mt-4 bg-accent-purple/5 p-4 rounded-lg">
                      <div className="font-medium mb-1">Instructor Response:</div>
                      <div className="text-neutral-700">
                        {review.instructorResponse}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      Helpful
                    </Button>
                    
                    {instructor.id === instructor.id && !review.instructorResponse && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="gap-1"
                        onClick={() => handleOpenResponseDialog(review)}
                      >
                        <MessageSquare className="h-3 w-3" />
                        Respond
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Respond to Review</DialogTitle>
            <DialogDescription>
              Your response will be visible publicly on your profile.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="response">Your Response</Label>
              <Textarea
                id="response"
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Thank you for your feedback..."
                className="min-h-[100px]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitResponse} 
              disabled={isLoading || !response.trim()}
            >
              {isLoading ? "Submitting..." : "Submit Response"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InstructorReviews;
