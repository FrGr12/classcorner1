import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  PlusCircle,
  ArrowUp,
  MessageCircle,
  Bookmark
} from "lucide-react";

const CommunityHome = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Popular Posts</h2>
        <Button variant="outline" size="sm">
          <PlusCircle className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="hover:bg-accent/5 transition-colors">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex flex-col items-center gap-1">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">42</span>
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold hover:text-accent-purple cursor-pointer">
                  Just finished my first ceramic workshop and I'm hooked!
                </h3>
                <p className="text-sm text-muted-foreground">
                  The experience was amazing and I learned so much. Here are some tips for beginners...
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="text-xs">Posted by Ceramic Enthusiast</span>
                  <span>•</span>
                  <button className="flex items-center gap-1 hover:text-accent-purple">
                    <MessageCircle className="h-4 w-4" />
                    24 comments
                  </button>
                  <button className="flex items-center gap-1 hover:text-accent-purple">
                    <Bookmark className="h-4 w-4" />
                    Save
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CommunityHome;
