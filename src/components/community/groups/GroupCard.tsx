
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Users, Lock, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface GroupCardProps {
  id: number;
  name: string;
  description: string | null;
  memberCount: number;
  type: 'open' | 'private';
  topic: string | null;
  region: string | null;
  onJoin: (groupId: number) => void;
}

export function GroupCard({ id, name, description, memberCount, type, topic, region, onJoin }: GroupCardProps) {
  const { t } = useLanguage();
  
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="pt-6 flex-1">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold">{name}</h3>
          {type === 'private' ? (
            <Lock className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Globe className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
        {description && <p className="text-muted-foreground mb-4">{description}</p>}
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>
              {memberCount === 1 
                ? t("group.members.one") 
                : t("group.members.other").replace('{count}', memberCount.toString())}
            </span>
          </div>
          {topic && <span>• {topic}</span>}
          {region && <span>• {region}</span>}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => onJoin(id)}
        >
          {type === 'private' ? t("group.requestToJoin") : t("group.join")}
        </Button>
      </CardFooter>
    </Card>
  );
}
