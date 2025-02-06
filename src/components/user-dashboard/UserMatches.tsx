
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, BookOpen, MapPin, Tag, TrendingUp, Heart, Navigation, History } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { CourseMatch } from "@/types/course-match";

const MatchScoreBreakdown = ({ match }: { match: CourseMatch }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="cursor-help">
              {match.match_score}% Match
            </Badge>
          </div>
        </TooltipTrigger>
        <TooltipContent className="w-64">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="flex items-center gap-1">
                <Heart className="h-3 w-3" /> Interest
              </span>
              <span>{match.interest_score}%</span>
            </div>
            <div className="flex justify-between">
              <span className="flex items-center gap-1">
                <Navigation className="h-3 w-3" /> Location
              </span>
              <span>{match.location_score}%</span>
            </div>
            <div className="flex justify-between">
              <span className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> Trending
              </span>
              <span>{match.trending_score}%</span>
            </div>
            <div className="flex justify-between">
              <span className="flex items-center gap-1">
                <History className="h-3 w-3" /> History
              </span>
              <span>{match.booking_history_score}%</span>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const UserMatches = () => {
  const { toast } = useToast();
  
  const { data: matches, isLoading, error } = useQuery({
    queryKey: ['course-matches'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('course_matches')
        .select(`
          *,
          course:courses(
            id,
            title,
            description,
            location,
            price,
            tags,
            category
          )
        `)
        .order('match_score', { ascending: false })
        .limit(10);

      if (error) throw error;
      return data as CourseMatch[];
    }
  });

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center text-red-500">
          Failed to load recommendations
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">AI-Powered Course Recommendations</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        {matches?.length === 0 ? (
          <Card className="p-6 col-span-2">
            <div className="text-center text-muted-foreground">
              <BookOpen className="mx-auto h-12 w-12 mb-3 opacity-50" />
              <p>No matches found yet. Try updating your interests in preferences!</p>
            </div>
          </Card>
        ) : (
          matches?.map((match) => (
            <Card key={match.id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{match.course?.title}</CardTitle>
                  <MatchScoreBreakdown match={match} />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {match.course?.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {match.course?.location}
                  </div>
                  
                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag className="h-4 w-4" />
                    {match.course?.tags?.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="font-semibold">
                    ${match.course?.price}
                  </span>
                  <Button variant="default" size="sm" asChild>
                    <a href={`/class/${match.course?.category}/${match.course?.id}`}>
                      View Details
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default UserMatches;
