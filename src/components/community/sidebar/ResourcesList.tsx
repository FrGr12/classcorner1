
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
          <button
            key={resourceName}
            onClick={() => onResourceClick(resourceName)}
            className={`w-full text-left px-3 py-2 text-sm font-medium hover:bg-accent rounded-lg transition-colors ${
              resource === resourceName.toLowerCase().replace(/ /g, '-')
                ? 'bg-accent text-accent-purple'
                : 'text-neutral-700'
            }`}
          >
            {resourceName}
          </button>
        ))}
      </nav>
    </div>
  );
};
