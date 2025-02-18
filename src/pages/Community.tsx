import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import CommunityHome from "@/components/community/CommunityHome";
import Navigation from "@/components/landing/Navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Post } from "@/types/community";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@/components/ui/skeleton";
const POSTS_PER_PAGE = 10;
const Community = () => {
  const navigate = useNavigate();
  const {
    topic,
    category,
    resource
  } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const {
    ref,
    inView
  } = useInView();
  useEffect(() => {
    document.title = "Community - Craftscape";
  }, []);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error
  } = useInfiniteQuery({
    queryKey: ['posts', topic, category, searchQuery],
    queryFn: async ({
      pageParam = 0
    }) => {
      let query = supabase.from('posts').select('*', {
        count: 'exact'
      });
      if (topic) {
        query = query.eq('topic', topic);
      }
      if (category) {
        query = query.eq('category', category);
      }
      if (searchQuery) {
        query = query.textSearch('search_vector', searchQuery);
      }
      const {
        data,
        error,
        count
      } = await query.order('created_at', {
        ascending: false
      }).range(pageParam * POSTS_PER_PAGE, (pageParam + 1) * POSTS_PER_PAGE - 1);
      if (error) throw error;
      return {
        posts: data as Post[],
        totalCount: count || 0,
        nextPage: data.length === POSTS_PER_PAGE ? pageParam + 1 : undefined
      };
    },
    getNextPageParam: lastPage => lastPage.nextPage,
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5 // 5 minutes
  });
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
  const handleCategoryClick = (categoryName: string) => {
    navigate(`/community/category/${categoryName.toLowerCase().replace(/ /g, '-')}`);
  };
  const handleResourceClick = (resourceName: string) => {
    navigate(`/community/resource/${resourceName.toLowerCase().replace(/ /g, '-')}`);
  };
  if (error) {
    return <div className="min-h-screen bg-background pt-24">
        <Navigation />
        <div className="container mx-auto py-8 px-4">
          <p className="text-red-500">Error loading posts: {(error as Error).message}</p>
        </div>
      </div>;
  }
  return <>
      <Navigation />
      <div className="min-h-screen bg-background pt-24">
        <div className="border-b bg-card">
          <div className="container mx-auto py-6 px-4">
            <h1 className="text-4xl font-bold mb-2">Community</h1>
            <p className="text-muted-foreground">
              Connect with fellow crafters, share experiences, and learn together
            </p>
          </div>
        </div>

        <div className="container mx-auto py-8 px-4">
          <div className="grid gap-6 md:grid-cols-[300px_1fr]">
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="px-3 py-2 text-base font-bold text-left">Categories</h3>
                <nav className="space-y-1">
                  {[{
                  name: "All",
                  count: "204K"
                }, {
                  name: "Pottery",
                  count: "45.2K"
                }, {
                  name: "Ceramics",
                  count: "32.1K"
                }, {
                  name: "Photography",
                  count: "28.9K"
                }, {
                  name: "Music",
                  count: "25.6K"
                }, {
                  name: "Paper Crafts",
                  count: "22.3K"
                }, {
                  name: "Wine & Spirits",
                  count: "18.7K"
                }, {
                  name: "Floral Design",
                  count: "15.4K"
                }, {
                  name: "Calligraphy",
                  count: "12.8K"
                }, {
                  name: "Fashion",
                  count: "10.5K"
                }].map(categoryItem => <button key={categoryItem.name} onClick={() => handleCategoryClick(categoryItem.name)} className={`w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-accent rounded-lg ${category === categoryItem.name.toLowerCase().replace(/ /g, '-') ? 'bg-accent' : ''}`}>
                      <span className="text-left">{categoryItem.name}</span>
                      <span className="text-muted-foreground text-xs">{categoryItem.count}</span>
                    </button>)}
                </nav>
              </div>

              <div className="space-y-1">
                <h3 className="font-medium px-3 py-2">Learning Resources</h3>
                <nav className="space-y-1">
                  {["Beginner Guides", "Tutorials", "Best Practices", "Tool Reviews", "Project Ideas", "Expert Tips"].map(resourceName => <button key={resourceName} onClick={() => handleResourceClick(resourceName)} className={`w-full text-left px-3 py-2 text-sm hover:bg-accent rounded-lg ${resource === resourceName.toLowerCase().replace(/ /g, '-') ? 'bg-accent' : ''}`}>
                      {resourceName}
                    </button>)}
                </nav>
              </div>
            </div>

            <main>
              <div className="max-w-2xl mx-auto mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search posts, communities, or resources..." className="pl-9 w-full" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                </div>
              </div>

              {isLoading ? <div className="space-y-4">
                  {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-32 w-full" />)}
                </div> : <>
                  <CommunityHome topic={topic} category={category} resource={resource} posts={data?.pages.flatMap(page => page.posts) || []} />
                  {isFetchingNextPage && <div className="mt-4 space-y-4">
                      {[...Array(2)].map((_, i) => <Skeleton key={i} className="h-32 w-full" />)}
                    </div>}
                  <div ref={ref} className="h-10" />
                </>}
            </main>
          </div>
        </div>
      </div>
    </>;
};
export default Community;