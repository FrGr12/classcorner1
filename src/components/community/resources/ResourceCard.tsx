
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, FileText, ExternalLink } from "lucide-react";

export interface Resource {
  id: number;
  title: string;
  description: string;
  type: string;
  category: string;
  readTime: string;
  author: string;
  publishedDate: string;
}

interface ResourceCardProps {
  resource: Resource;
  onClick: (id: number) => void;
}

export function ResourceCard({ resource, onClick }: ResourceCardProps) {
  return (
    <Card 
      key={resource.id} 
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(resource.id)}
    >
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              {resource.type === "Guide" ? (
                <Book className="h-5 w-5 text-accent-purple" />
              ) : (
                <FileText className="h-5 w-5 text-accent-purple" />
              )}
              <Badge variant="outline">{resource.type}</Badge>
            </div>
            <Badge className="bg-accent-lavender text-primary">
              {resource.category}
            </Badge>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-2 hover:text-accent-purple cursor-pointer group flex items-center gap-2">
              {resource.title}
              <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-sm text-muted-foreground">
              {resource.description}
            </p>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t">
            <span>{resource.author}</span>
            <div className="flex items-center gap-2">
              <span>{resource.readTime}</span>
              <span>•</span>
              <span>{new Date(resource.publishedDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
