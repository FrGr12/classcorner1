import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

const LoadingState = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    </Card>
  );
};

export default LoadingState;