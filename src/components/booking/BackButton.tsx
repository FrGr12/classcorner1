
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  onClick: () => void;
  isGuestBooking: boolean;
}

const BackButton = ({ onClick, isGuestBooking }: BackButtonProps) => {
  return (
    <Button
      variant="outline"
      size="lg"
      className="mb-6 gap-2 text-base hover:bg-neutral-100"
      onClick={onClick}
    >
      <ArrowLeft className="h-5 w-5" />
      {isGuestBooking ? "Back to booking details" : "Back to class details"}
    </Button>
  );
};

export default BackButton;
