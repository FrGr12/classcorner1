
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MatchCardProps {
  id: number;
  title: string;
  instructor: string;
  price: number;
  rating: number;
  category: string;
  isSponsored?: boolean;
  matchScore: number;
}

const MatchCard = ({
  id,
  title,
  instructor,
  price,
  rating,
  category,
  isSponsored = false,
  matchScore
}: MatchCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className={`p-4 space-y-4 ${isSponsored ? 'border-[#6E44FF]' : ''}`}>
      {isSponsored && (
        <Badge variant="secondary" className="bg-[#6E44FF] text-white">
          Sponsored
        </Badge>
      )}
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground">by {instructor}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
          <Badge variant="outline">{category}</Badge>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-semibold">${price}</span>
          <Badge variant="secondary">{matchScore}% Match</Badge>
        </div>
      </div>

      <Button 
        onClick={() => navigate(`/class/${category}/${id}`)}
        className="w-full bg-[#6E44FF] hover:bg-[#6E44FF]/90"
      >
        View Class
      </Button>
    </Card>
  );
};

export default MatchCard;
