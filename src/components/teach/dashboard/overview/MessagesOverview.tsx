
import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MessagesOverview: FC = () => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Recent Messages</h3>
            <Button 
              variant="ghost"
              size="sm"
              className="text-accent-purple"
              onClick={() => navigate("/dashboard/messages")}
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            {/* Placeholder for messages list */}
            <p className="text-muted-foreground text-sm">No new messages</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessagesOverview;
