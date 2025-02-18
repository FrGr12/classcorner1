
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Book, Video, Plus, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Resource {
  id: number;
  title: string;
  description: string;
  resource_type: 'guide' | 'template' | 'video' | 'document';
  url?: string;
  file_path?: string;
  downloads: number;
  category: string;
  created_at: string;
}

const CommunityResources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const { data, error } = await supabase
          .from('community_resources')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setResources(data || []);
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'guide':
      case 'template':
        return <FileText className="h-5 w-5" />;
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'document':
        return <Book className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Learning Resources</h2>
        <Button className="bg-accent-purple hover:bg-accent-purple/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Resource
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Guides & Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Access teaching guides and templates
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="h-5 w-5" />
              Best Practices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Learn from experienced instructors
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              Tutorial Videos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Watch platform tutorials and tips
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Featured Resources</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading resources...</p>
          ) : resources.length > 0 ? (
            <div className="divide-y">
              {resources.map((resource) => (
                <div key={resource.id} className="py-4 flex items-start gap-4">
                  <div className="p-2 bg-accent/50 rounded">
                    {getResourceIcon(resource.resource_type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold hover:text-accent-purple cursor-pointer">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {resource.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>{resource.category}</span>
                      <span>{resource.downloads} downloads</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No resources available yet. Be the first to contribute!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityResources;
