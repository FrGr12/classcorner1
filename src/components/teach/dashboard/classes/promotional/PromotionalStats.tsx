import { useEffect, useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import PromotionalFilters from "./components/PromotionalFilters";
import PromotionalActions from "./components/PromotionalActions";
import MetricsChart from "./components/MetricsChart";
import Recommendations from "./components/Recommendations";
import PromoteDialog from "../promote/PromoteDialog";

type PromotionType = 'boost' | 'sponsor' | 'outreach';

interface PromotionalMetrics {
  date: string;
  views: number;
  ctr: number;
  saves: number;
  bookings: number;
  matches: number;
}

interface ClassOption {
  id: number;
  title: string;
}

const PromotionalStats = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<PromotionalMetrics[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [timeRange, setTimeRange] = useState<string>("7days");
  const [classes, setClasses] = useState<ClassOption[]>([]);
  const [promoteDialogOpen, setPromoteDialogOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [promotionType, setPromotionType] = useState<PromotionType | undefined>();

  useEffect(() => {
    const fetchClasses = async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('id, title')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setClasses(data);
      }
    };

    fetchClasses();
  }, []);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        let query = supabase
          .from('course_promotional_stats')
          .select(`
            views,
            saves,
            ad_clicks,
            created_at,
            courses!inner (
              id,
              title,
              bookings:bookings(count)
            )
          `)
          .order('created_at', { ascending: true });

        if (selectedClass !== "all") {
          query = query.eq('course_id', parseInt(selectedClass, 10));
        }

        const now = new Date();
        const daysAgo = timeRange === "7days" ? 7 : timeRange === "30days" ? 30 : 90;
        const startDate = new Date(now.setDate(now.getDate() - daysAgo));
        query = query.gte('created_at', startDate.toISOString());

        const { data: promotionalStats, error: statsError } = await query;

        if (statsError) throw statsError;

        const formattedMetrics: PromotionalMetrics[] = promotionalStats.map(stat => {
          const views = stat.views || 0;
          const adClicks = stat.ad_clicks || 0;
          const ctr = views > 0 ? (adClicks / views) * 100 : 0;

          return {
            date: new Date(stat.created_at).toLocaleDateString(),
            views: views,
            ctr: Number(ctr.toFixed(1)),
            saves: stat.saves || 0,
            bookings: stat.courses?.bookings[0]?.count || 0,
            matches: 0
          };
        });

        setMetrics(formattedMetrics);
      } catch (err: any) {
        console.error('Error fetching promotional metrics:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [selectedClass, timeRange]);

  const handlePromotion = (type: PromotionType) => {
    if (selectedClass === "all") {
      toast.error("Please select a specific class first");
      return;
    }
    setSelectedClassId(parseInt(selectedClass, 10));
    setPromotionType(type);
    setPromoteDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load promotional metrics: {error}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <PromotionalFilters
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          classes={classes}
        />
        <PromotionalActions
          onBoost={() => handlePromotion('boost')}
          onSponsor={() => handlePromotion('sponsor')}
          onOutreach={() => handlePromotion('outreach')}
        />
      </div>

      <MetricsChart metrics={metrics} />
      <Recommendations metrics={metrics} />

      <PromoteDialog 
        open={promoteDialogOpen}
        onOpenChange={setPromoteDialogOpen}
        classId={selectedClassId}
        promotionType={promotionType}
      />
    </div>
  );
};

export default PromotionalStats;
