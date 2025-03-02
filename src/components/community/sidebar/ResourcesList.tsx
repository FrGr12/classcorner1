
import { Button } from "@/components/ui/button";

interface ResourcesListProps {
  resource?: string;
  onResourceClick: (resourceName: string) => void;
}

export const ResourcesList = ({ resource, onResourceClick }: ResourcesListProps) => {
  const resources = [
    "Beginner Guides",
    "Tutorials",
    "Best Practices",
    "Tool Reviews",
    "Project Ideas",
    "Expert Tips"
  ];

  return (
    <div className="space-y-1">
      <nav className="space-y-1">
        {resources.map(resourceName => (
          <Button
            key={resourceName}
            onClick={() => onResourceClick(resourceName)}
            variant={resource === resourceName.toLowerCase().replace(/ /g, '-') ? "subtle" : "ghost"}
            size="sm"
            className="w-full justify-start text-left px-3 py-2 h-auto text-sm font-medium rounded-lg transition-colors"
          >
            {resourceName}
          </Button>
        ))}
      </nav>
    </div>
  );
};
