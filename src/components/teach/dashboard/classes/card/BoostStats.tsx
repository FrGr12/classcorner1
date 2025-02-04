
import { useEffect, useState } from "react";
import { Loader2, TrendingUp, Eye, MousePointerClick, Trophy, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

interface BoostStatsProps {
  courseId: number;
}

interface Stats {
  views: number;
  clicks: number;
  conversionRate: number;
  achievements?: {
    featuredCount: number;
    topPerformer: boolean;
    reachMilestone: boolean;
  };
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
            achievements: {
              featuredCount: 0,
              topPerformer: false,
              reachMilestone: false,
            }
          });
          return;
        }

        // Mock stats for demonstration - in a real app this would come from the boost data
        setStats({
          views: 245,
          clicks: 52,
          conversionRate: 21.2,
          achievements: {
            featuredCount: 3,
            topPerformer: true,
            reachMilestone: true,
          }
        });
      } catch (error) {
        console.error('Error fetching boost stats:', error);
        setStats({
          views: 0,
          clicks: 0,
          conversionRate: 0,
          achievements: {
            featuredCount: 0,
            topPerformer: false,
            reachMilestone: false,
          }
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
      {/* Achievements Section */}
      <div className="flex flex-wrap gap-2 mb-4">
        {stats.achievements?.featuredCount > 0 && (
          <Badge variant="default" className="bg-amber-500 hover:bg-amber-600">
            <Trophy className="h-3 w-3 mr-1" />
            Featured {stats.achievements.featuredCount}x this month
          </Badge>
        )}
        {stats.achievements?.topPerformer && (
          <Badge variant="default" className="bg-purple-500 hover:bg-purple-600">
            <Star className="h-3 w-3 mr-1" />
            Top Performer
          </Badge>
        )}
      </div>

      {/* Stats Grid */}
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

      {/* Performance Insights */}
      {stats.conversionRate > 20 && (
        <div className="bg-green-50 text-green-700 text-sm p-2 rounded">
          🎉 Great performance! Your conversion rate is above average.
        </div>
      )}
      
      {stats.views > 200 && (
        <div className="bg-blue-50 text-blue-700 text-sm p-2 rounded">
          🚀 Trending! Your class is getting lots of attention.
        </div>
      )}
    </div>
  );
};

export default BoostStats;
