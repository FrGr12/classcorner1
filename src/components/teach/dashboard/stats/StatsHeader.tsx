
import { Filter, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const StatsHeader = () => {
  return (
    <Card className="mb-4 sm:mb-8 rounded-none sm:rounded-md border-x-0 sm:border-x">
      <CardContent className="p-3 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          <div className="text-left">
            <h1 className="text-xl sm:text-2xl font-bold">Stats & Insights</h1>
            <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
              View your class statistics and insights
            </p>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <Button variant="outline" className="text-xs sm:text-sm h-8 sm:h-10 px-2 sm:px-3">
              <Filter className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Filter
            </Button>
            <Button className="bg-accent-purple hover:bg-accent-purple/90 text-white text-xs sm:text-sm h-8 sm:h-10 px-2 sm:px-3">
              <Download className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Export
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsHeader;
