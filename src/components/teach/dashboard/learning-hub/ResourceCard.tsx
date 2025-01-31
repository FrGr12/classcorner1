import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface ResourceCardProps {
  resource: {
    title: string;
    description: string;
    type: string;
    icon: LucideIcon;
    link: string;
  };
}

const ResourceCard = ({ resource }: ResourceCardProps) => {
  const { title, description, type, icon: Icon, link } = resource;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start space-x-4">
          <div className="rounded-lg bg-primary/10 p-2">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
            <div className="pt-4">
              <Button asChild>
                <Link to={link}>
                  {type === "video" ? "Watch Tutorial" : "Read Guide"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ResourceCard;