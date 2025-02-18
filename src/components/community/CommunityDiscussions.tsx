
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PlusCircle, 
  Search, 
  MessageSquare, 
  Users, 
  Clock,
  School,
  Megaphone,
  HelpCircle,
  Tool 
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

interface Discussion {
  id: number;
  title: string;
  content: string;
  category_id: number;
  author_id: string;
  views: number;
  created_at: string;
  last_reply_at: string;
}

const CommunityDiscussions = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('forum_categories')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) throw error;
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchDiscussions = async () => {
      try {
        const { data, error } = await supabase
          .from('forum_discussions')
          .select('*')
          .order('last_reply_at', { ascending: false })
          .limit(10);

        if (error) throw error;
        setDiscussions(data);
      } catch (error) {
        console.error('Error fetching discussions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    fetchDiscussions();
  }, []);

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      school: School,
      megaphone: Megaphone,
      'help-circle': HelpCircle,
      users: Users,
      tool: Tool,
    };
    const IconComponent = icons[iconName];
    return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search discussions..."
            className="pl-10"
          />
        </div>
        <Button className="bg-accent-purple hover:bg-accent-purple/90">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Discussion
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {/* Categories Sidebar */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-accent/50 transition-colors text-left"
                  >
                    {getIconComponent(category.icon)}
                    <div>
                      <div className="font-medium">{category.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {category.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Discussions List */}
        <div className="md:col-span-3">
          <Card>
            <CardContent className="p-0">
              {loading ? (
                <div className="p-6 text-center text-muted-foreground">
                  Loading discussions...
                </div>
              ) : discussions.length > 0 ? (
                <div className="divide-y">
                  {discussions.map((discussion) => (
                    <div
                      key={discussion.id}
                      className="p-4 hover:bg-accent/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold hover:text-accent-purple">
                            {discussion.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {discussion.content}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              0 replies
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {discussion.views} views
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatDate(discussion.created_at)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-muted-foreground">
                  No discussions yet. Be the first to start a conversation!
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CommunityDiscussions;
