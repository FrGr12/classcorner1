
import { Card } from "@/components/ui/card";
import { Heart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const UserSavedClasses = () => {
  const navigate = useNavigate();

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Saved Classes</h2>
          <p className="text-sm text-muted-foreground">Classes you're interested in</p>
        </div>
        <Heart className="w-5 h-5 text-[#6E44FF]" />
      </div>
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="w-12 h-12 rounded-full bg-[#6E44FF]/10 flex items-center justify-center mb-4">
          <Search className="w-6 h-6 text-[#6E44FF]" />
        </div>
        <h3 className="text-lg font-medium mb-2">No saved classes yet</h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-sm">
          Save classes you're interested in to easily find them later and get notified about availability
        </p>
        <Button 
          onClick={() => navigate('/browse')}
          className="bg-[#6E44FF] hover:bg-[#6E44FF]/90"
        >
          Explore Classes
        </Button>
      </div>
    </Card>
  );
};

export default UserSavedClasses;
