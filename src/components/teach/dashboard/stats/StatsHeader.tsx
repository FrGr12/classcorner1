
import { Filter, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const StatsHeader = () => {
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <h1 className="text-2xl font-bold">Stats & Insights</h1>
            <p className="text-muted-foreground mt-1">
              View your class statistics and insights
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="text-sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter Data
            </Button>
            <Button className="bg-accent-purple hover:bg-accent-purple/90 text-white text-sm">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsHeader;
