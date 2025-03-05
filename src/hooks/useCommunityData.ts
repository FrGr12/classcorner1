
import { useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Post } from "@/types/community";

const POSTS_PER_PAGE = 10;
const INITIAL_TOPICS_TO_SHOW = 10;

export function useCommunityData(topic?: string, category?: string, searchQuery = "") {
  const [showAllTopics, setShowAllTopics] = useState(false);
  
  const { data: groupsData } = useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('community_groups')
        .select('*')
        .order('member_count', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const { data: topicsData } = useQuery({
    queryKey: ['topics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('tags')
        .not('tags', 'is', null);
      
      if (error) throw error;
      
      const tagCounts = data.reduce((acc: Record<string, number>, post) => {
        post.tags?.forEach(tag => {
          acc[tag] = (acc[tag] || 0) + 1;
        });
        return acc;
      }, {});
      
      return Object.entries(tagCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);
    }
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error
  } = useInfiniteQuery({
    queryKey: ['posts', topic, category, searchQuery],
    queryFn: async ({ pageParam = 0 }) => {
      let query = supabase.from('posts').select('*', { count: 'exact' });
      
      if (topic) {
        query = query.contains('tags', [topic]);
      }
      if (category && category !== 'all') {
        query = query.eq('category', category);
      }
      if (searchQuery) {
        query = query.textSearch('search_vector', searchQuery);
      }
      
      const { data: posts, error, count } = await query
        .order('created_at', { ascending: false })
        .range(pageParam * POSTS_PER_PAGE, (pageParam + 1) * POSTS_PER_PAGE - 1);
      
      if (error) throw error;
      
      return {
        posts: posts as Post[],
        totalCount: count || 0,
        nextPage: posts.length === POSTS_PER_PAGE ? pageParam + 1 : undefined
      };
    },
    getNextPageParam: lastPage => lastPage.nextPage,
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5
  });

  const displayedTopics = showAllTopics 
    ? topicsData 
    : topicsData?.slice(0, INITIAL_TOPICS_TO_SHOW);

  return {
    groupsData,
    topicsData,
    displayedTopics,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    showAllTopics,
    setShowAllTopics
  };
}
