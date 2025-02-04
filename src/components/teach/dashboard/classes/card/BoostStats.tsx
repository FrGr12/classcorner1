
import { useEffect, useState } from "react";
import { Loader2, TrendingUp, Eye, MousePointerClick } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BoostStatsProps {
  courseId: number;
}

interface Stats {
  views: number;
  clicks: number;
  conversionRate: number;
}

const BoostStats = ({ courseId }: BoostStatsProps) => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data, error } = await supabase
          .from('course_boosts')
          .select('*')
          .eq('course_id', courseId)
          .eq('status', 'active')
          .maybeSingle();

        if (error) throw error;

        // If there's no active boost, show default stats
        if (!data) {
          setStats({
            views: 0,
            clicks: 0,
            conversionRate: 0,
          });
          return;
        }

        // Mock stats for demonstration - in a real app this would come from the boost data
        setStats({
          views: 245,
          clicks: 52,
          conversionRate: 21.2,
        });
      } catch (error) {
        console.error('Error fetching boost stats:', error);
        // Set default values on error
        setStats({
          views: 0,
          clicks: 0,
          conversionRate: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-4">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-sm text-muted-foreground text-center py-2">
        No promotion data available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Eye className="h-4 w-4" />
            Views
          </div>
          <p className="text-lg font-medium">{stats.views}</p>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MousePointerClick className="h-4 w-4" />
            Clicks
          </div>
          <p className="text-lg font-medium">{stats.clicks}</p>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4" />
            Conversion
          </div>
          <p className="text-lg font-medium">{stats.conversionRate}%</p>
        </div>
      </div>

      {stats.conversionRate > 20 && (
        <div className="bg-green-50 text-green-700 text-sm p-2 rounded">
          🎉 Great performance! Your conversion rate is above average.
        </div>
      )}
    </div>
  );
};

export default BoostStats;
