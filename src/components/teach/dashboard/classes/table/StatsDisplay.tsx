
import { Eye, BookmarkCheck, MousePointer } from "lucide-react";

interface StatsDisplayProps {
  views: number;
  saves: number;
  adClicks: number;
}

const StatsDisplay = ({ views, saves, adClicks }: StatsDisplayProps) => {
  return (
    <>
      <td className="text-center">
        <div className="flex items-center justify-center gap-1">
          <Eye className="h-4 w-4 text-muted-foreground" />
          <span>{views || 0}</span>
        </div>
      </td>
      <td className="text-center">
        <div className="flex items-center justify-center gap-1">
          <BookmarkCheck className="h-4 w-4 text-muted-foreground" />
          <span>{saves || 0}</span>
        </div>
      </td>
      <td className="text-center">
        <div className="flex items-center justify-center gap-1">
          <MousePointer className="h-4 w-4 text-muted-foreground" />
          <span>{adClicks || 0}</span>
        </div>
      </td>
    </>
  );
};

export default StatsDisplay;
