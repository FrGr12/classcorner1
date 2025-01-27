import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TestimonialCardProps {
  name: string;
  date: string;
  rating: number;
  comment: string;
  avatarUrl?: string;
}

const TestimonialCard = ({ name, date, rating, comment, avatarUrl }: TestimonialCardProps) => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-neutral-200">
      <div className="flex items-center gap-4 mb-4">
        <Avatar>
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-sm text-neutral-600">{date}</p>
        </div>
      </div>
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-accent-purple text-accent-purple" />
        ))}
      </div>
      <p className="text-neutral-600">{comment}</p>
    </div>
  );
};

export default TestimonialCard;