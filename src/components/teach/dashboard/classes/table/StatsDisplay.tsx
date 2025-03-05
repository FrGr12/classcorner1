
import { Eye, BookmarkCheck, MousePointer } from "lucide-react";

interface StatsDisplayProps {
  views: number;
  saves: number;
  adClicks: number;
}

const StatsDisplay = ({ views, saves, adClicks }: StatsDisplayProps) => {
  return (
    <>
      <td className="text-center px-1 sm:px-4">
        <div className="flex items-center justify-center gap-1">
          <Eye className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          <span className="text-xs sm:text-sm">{views || 0}</span>
        </div>
      </td>
      <td className="text-center px-1 sm:px-4">
        <div className="flex items-center justify-center gap-1">
          <BookmarkCheck className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          <span className="text-xs sm:text-sm">{saves || 0}</span>
        </div>
      </td>
      <td className="text-center px-1 sm:px-4">
        <div className="flex items-center justify-center gap-1">
          <MousePointer className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          <span className="text-xs sm:text-sm">{adClicks || 0}</span>
        </div>
      </td>
    </>
  );
};

export default StatsDisplay;
