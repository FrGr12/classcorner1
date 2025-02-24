
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogHeader, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface BookingDialogContentProps {
  type: string | null;
  title: string;
  description: string;
  selectedClass: {
    id: number;
    title: string;
    instructor: string;
  } | null;
  onClose: () => void;
}

const BookingDialogContent: React.FC<BookingDialogContentProps> = ({
  type,
  title,
  description,
  selectedClass,
  onClose,
}) => {
  const { toast } = useToast();

  const handleAction = () => {
    switch (type) {
      case "cancel":
        toast({
          title: "Booking cancelled",
          description: "Your booking has been cancelled successfully."
        });
        break;
      case "message":
        toast({
          title: "Message sent",
          description: "Your message has been sent to the instructor."
        });
        break;
      case "promote":
        toast({
          title: "Invitation sent",
          description: "Invitations have been sent to your friends."
        });
        break;
      default:
        break;
    }
    onClose();
  };

  switch (type) {
    case "cancel":
      return (
        <>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Please note that cancellation policies may apply. Check the class details for more information.
            </p>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={onClose}>
                Keep Booking
              </Button>
              <Button variant="destructive" onClick={handleAction}>
                Confirm Cancellation
              </Button>
            </div>
          </div>
        </>
      );
    case "message":
      return (
        <>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Type your message here..." className="h-24" />
            <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleAction}>
              Send Message
            </Button>
          </div>
        </>
      );
    case "share":
      return (
        <>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">Twitter</Button>
              <Button variant="outline" className="w-full">Facebook</Button>
              <Button variant="outline" className="w-full">LinkedIn</Button>
              <Button variant="outline" className="w-full">Copy Link</Button>
            </div>
          </div>
        </>
      );
    case "promote":
      return (
        <>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Enter email addresses..." />
            <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleAction}>
              Send Invitations
            </Button>
          </div>
        </>
      );
    default:
      return null;
  }
};

export default BookingDialogContent;
